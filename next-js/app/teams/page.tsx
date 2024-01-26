import Link from "next/link";
import styles from "./page.module.css";
import { getAuthUser } from "../util";
import { Role } from "../enums";
import TeamsController from "@/app/controllers/Teams";
import ProjectManagementAppAPIError from "../errors/ProjectManagementAppAPIError";
import { RowDataPacket } from "mysql2";
import { ITeamsView } from "../interfaces";

const teamsController = new TeamsController();

let response:
  | { teams: RowDataPacket; message?: undefined }
  | {
      message: string;
      teams?: undefined;
    };
let err: string;

function renderCreatedTeams() {
  if (err) {
    return <div>{err}</div>;
  }
  if (response.message) {
    <div>{response.message}</div>;
  }
  if (response.teams) {
    return (
      <div className={styles.teams}>
        {response.teams.map((team: ITeamsView, index: number) => (
          <div key={index} className={styles.team}>
            <div className={styles.teamNameAndDescription}>
              <div className={styles.name}>{team.name}</div>
              <div className={styles.description}>{team.description}</div>
            </div>
            <Link href={`/user/${team.managerUsername}`} className={styles.manager}>
              {team.managerFullName}
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

async function Teams() {
  const authUser = await getAuthUser();

  try {
    response = await teamsController.getTeamsCreatedByUsername(authUser?.username);
  } catch (error) {
    err = (error as ProjectManagementAppAPIError).message;
  }

  return (
    <>
      <div className={styles.header}>
        <span>Teams</span>
      </div>
      <div className={styles.container}>
        {authUser?.role === Role.ADMIN || authUser?.role === Role.MANAGER ? (
          <div className={styles.created}>
            <div className={styles.createdHeader}>Teams you've created</div>
            {renderCreatedTeams()}
            <Link href="#">Add</Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Teams;
