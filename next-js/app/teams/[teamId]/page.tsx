import { TeamIdRouteParam } from '@/app/api/types';
import TeamMembersController from '@/app/controllers/TeamMembers';
import TeamsController from '@/app/controllers/Teams';
import ProjectManagementAppAPIError from '@/app/errors/ProjectManagementAppAPIError';
import { ITeamMembersView, ITeamsView } from '@/app/interfaces';
import { RowDataPacket } from 'mysql2';

const teamsController = new TeamsController();
const teamMembersController = new TeamMembersController();

let responseTeam: {
  team: RowDataPacket;
  message?: undefined;
} | {
  message: string;
  team?: undefined;
}

let responseTeamMembers: {
  teamMembers: RowDataPacket;
  message?: undefined;
} | {
  message: string;
  teamMembers?: undefined;
}

let team: ITeamsView;
let teamMembers: Array<ITeamMembersView>;

let err: string

function renderTeamMemberInfo() {
  if (responseTeamMembers.message) {
    return <div>{responseTeamMembers.message}</div>
  }

  if (responseTeamMembers.teamMembers) {
    teamMembers = responseTeamMembers.teamMembers as Array<ITeamMembersView>

    return teamMembers.map((member, index) => (
      <div>
        <div>{member.memberFullName}</div>
        <div>{member.managerFullName}</div>
        <div>{member.created?.toString()}</div>
        <div>{member.updated?.toString()}</div>
      </div>
    ))
  }
}

function renderTeamInfo() {
  
  if (err) {
    return <div className='message error'>{err}</div>
  }
  
  if (responseTeam.message) {
    return <div className='message'>{responseTeam.message}</div>
  }

  if (responseTeam.team) {
    team = responseTeam.team as ITeamsView

    return (
      <div>
        <div>{team.name}</div>
        <div>{team.description}</div>
        <div>{team.managerFullName}</div>
        <div>{team.created?.toString()}</div>
        <div>{team.updated?.toString()}</div>
        <hr/>
        <div>Team Members</div>
        { renderTeamMemberInfo() }
        {/* TODO: ADD a team member to a team */}
      </div>
    )
  }
}

async function TeamInfo({ params }: TeamIdRouteParam) {

  try {
    responseTeam = await teamsController.getTeamById(params.teamId)
    responseTeamMembers = await teamMembersController.getMembersInATeam(params.teamId)
  } catch (error) {
    const { message } = error as ProjectManagementAppAPIError
    err = message
  }

  return renderTeamInfo()
}

export default TeamInfo
