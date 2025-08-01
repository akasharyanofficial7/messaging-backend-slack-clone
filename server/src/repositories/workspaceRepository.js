import Workspace from "../schema/workspace.js";
import crudRepository from "./crudRepository.js";
const workSpaceRepository = {
  ...crudRepository(Workspace),
  getWorkspaceByName: async function () {},
  getWorkspaceByJoinCode: async function () {},
  addMemberToWorkspace: async function () {},
  addChannelToWorkspace: async function () {},
  fetchAllWorkspaceByMemberId: async function () {},
};

export default workSpaceRepository;
