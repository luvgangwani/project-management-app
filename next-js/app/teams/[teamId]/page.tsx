import { TeamIdRouteParam } from "@/app/api/types";
import TeamMembersController from "@/app/controllers/TeamMembers";
import TeamsController from "@/app/controllers/Teams";
import ProjectManagementAppAPIError from "@/app/errors/ProjectManagementAppAPIError";
import { ITeamMembersView, ITeamsView } from "@/app/interfaces";
import { RowDataPacket } from "mysql2";
import styles from "./page.module.css";
import Link from "next/link";

const teamsController = new TeamsController();
const teamMembersController = new TeamMembersController();

let responseTeam:
  | {
      team: RowDataPacket;
      message?: undefined;
    }
  | {
      message: string;
      team?: undefined;
    };

let responseTeamMembers:
  | {
      teamMembers: RowDataPacket;
      message?: undefined;
    }
  | {
      message: string;
      teamMembers?: undefined;
    };

let team: ITeamsView;
let teamMembers: Array<ITeamMembersView>;

let err: string;

function renderTeamMemberInfo() {
  if (responseTeamMembers.message) {
    return <div className="message">{responseTeamMembers.message}</div>;
  }

  if (responseTeamMembers.teamMembers) {
    teamMembers = responseTeamMembers.teamMembers as Array<ITeamMembersView>;

    return teamMembers.map((member, index) => (
      <div key={index} className={styles.teamMember}>
        <div>{member.memberFullName}</div>
        <div>{member.managerFullName}</div>
        <div className={styles.created}>{member.created?.toString()}</div>
        <div className={styles.updated}>{member.updated?.toString()}</div>
      </div>
    ));
  }
}

function renderTeamInfo() {
  if (err) {
    return <div className="message error">{err}</div>;
  }

  if (responseTeam.message) {
    return <div className="message">{responseTeam.message}</div>;
  }

  if (responseTeam.team) {
    team = responseTeam.team as ITeamsView;

    return (
      <div className={styles.container}>
        <div className={styles.header}>{team.name}</div>
        <div className={styles.description}>
          {team.description ? team.description : "No description"}
        </div>
        <div className={styles.meta}>
          <div className={styles.manager}>
            Created by:
            <Link href={`/profile/${team.managerUsername}`}>
              {team.managerFullName}
            </Link>
          </div>
          <div className={styles.created}>
            <span>Created:</span>
            <span>{team.created?.toString()}</span>
          </div>
          <div className={styles.updated}>
            <span>Updated:</span>
            <span>{team.updated?.toString()}</span>
          </div>
        </div>
        <div className={styles.teamMembersHeader}>Team Members</div>
        <div className={styles.teamMembersContainer}>
          <div className={styles.tableHeader}>
            <div>Member</div>
            <div>Added by</div>
            <div>Created</div>
            <div>Updated</div>
          </div>
          {renderTeamMemberInfo()}
          <Link href={`/teams/${team.id}/add`} className={styles.add}>Add</Link>
        </div>
        {/* TODO: ADD a team member to a team */}
      </div>
    );
  }
}

async function TeamInfo({ params }: TeamIdRouteParam) {
  try {
    responseTeam = await teamsController.getTeamById(params.teamId);
    responseTeamMembers = await teamMembersController.getMembersInATeam(
      params.teamId
    );
  } catch (error) {
    const { message } = error as ProjectManagementAppAPIError;
    err = message;
  }

  return renderTeamInfo();
}

export default TeamInfo;
