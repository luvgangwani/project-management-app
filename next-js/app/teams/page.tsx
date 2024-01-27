import Link from "next/link";
import styles from "./page.module.css";
import { getAuthUser } from "../util";
import { Role } from "../enums";
import TeamsController from "@/app/controllers/Teams";
import ProjectManagementAppAPIError from "../errors/ProjectManagementAppAPIError";
import { RowDataPacket } from "mysql2";
import { ITeamMembersView, ITeamsView } from "../interfaces";

const teamsController = new TeamsController();

let responseCreatedTeams:
  | { teams: RowDataPacket; message?: undefined }
  | {
      message: string;
      teams?: undefined;
    };
let responseTeamsYouAreAPartOf:
| { teams: RowDataPacket; message?: undefined }
| {
    message: string;
    teams?: undefined;
  };
let errCreatedTeams: string;
let errTeamsYouAreAPartOf: string;

function renderCreatedTeams() {
  if (errCreatedTeams) {
    return <div>{errCreatedTeams}</div>;
  }
  if (responseCreatedTeams.message) {
    return <div>{responseCreatedTeams.message}</div>;
  }
  if (responseCreatedTeams.teams) {
    return (
      <div className={styles.teams}>
        {responseCreatedTeams.teams.map((team: ITeamsView, index: number) => (
          <div key={index} className={styles.team}>
            <div className={styles.teamNameAndDescription}>
              <div className={styles.name}>{team.name}</div>
              <div className={styles.description}>{team.description ? team.description : 'No description'}</div>
            </div>
            <div className={styles.manager}>
              Created by: <Link href={`/user/${team.managerUsername}`}>
                {team.managerFullName}
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

function renderTeamsYouAreAPartOf() {
  if (errTeamsYouAreAPartOf) {
    return <div>{errTeamsYouAreAPartOf}</div>;
  }
  if (responseTeamsYouAreAPartOf.message) {
    return <div>{responseTeamsYouAreAPartOf.message}</div>;
  }
  if (responseTeamsYouAreAPartOf.teams) {
    return (
      <div className={styles.teams}>
        {responseTeamsYouAreAPartOf.teams.map((team: ITeamMembersView, index: number) => (
          <div key={index} className={styles.team}>
            <div className={styles.teamNameAndDescription}>
              <div className={styles.name}>{team.teamName}</div>
              <div className={styles.description}>{team.teamDescription ? team.teamDescription : 'No description'}</div>
            </div>
            <div className={styles.manager}>
              Created by: <Link href={`/user/${team.managerUsername}`}>
                {team.managerFullName}
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

async function Teams() {
  const authUser = await getAuthUser();

  try {
    responseCreatedTeams = await teamsController.getTeamsCreatedByUsername(authUser?.username);
  } catch (error) {
    errCreatedTeams = (error as ProjectManagementAppAPIError).message;
  }

  try {
    responseTeamsYouAreAPartOf = await teamsController.getTeamsByUsername(authUser?.username);
  } catch (error) {
    errTeamsYouAreAPartOf = (error as ProjectManagementAppAPIError).message;
  }

  return (
    <>
      <div className="page-header">Teams</div>
      <div className={styles.container}>
        {authUser?.role === Role.ADMIN || authUser?.role === Role.MANAGER ? (
          <div className={styles.created}>
            <div className={styles.createdHeader}>Teams you've created</div>
            {renderCreatedTeams()}
            <Link href="/teams/add">Add</Link>
          </div>
        ) : (
          <></>
        )}

        <div className={styles.assigned}>
          <div className={styles.createdHeader}>Teams you're a part of</div>
          {renderTeamsYouAreAPartOf()}
        </div>
      </div>
    </>
  );
}

export default Teams;
