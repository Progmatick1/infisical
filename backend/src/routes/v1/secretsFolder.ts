import express from "express";
const router = express.Router();
import {
  requireAuth,
  requireWorkspaceAuth,
  validateRequest,
} from "../../middleware";
import { body, param, query } from "express-validator";
import {
  createFolder,
  deleteFolder,
  getFolders,
  updateFolderById,
} from "../../controllers/v1/secretsFolderController";
import { ADMIN, MEMBER } from "../../variables";

router.post(
  "/",
  requireAuth({
    acceptedAuthModes: ["jwt"],
  }),
  requireWorkspaceAuth({
    acceptedRoles: [ADMIN, MEMBER],
    locationWorkspaceId: "body",
  }),
  body("workspaceId").exists(),
  body("environment").exists(),
  body("folderName").exists(),
  body("parentFolderId"),
  validateRequest,
  createFolder
);

router.patch(
  "/:folderId",
  requireAuth({
    acceptedAuthModes: ["jwt"],
  }),
  body("workspaceId").exists(),
  body("environment").exists(),
  param("folderId").not().isIn(["root"]).exists(),
  validateRequest,
  updateFolderById
);

router.delete(
  "/:folderId",
  requireAuth({
    acceptedAuthModes: ["jwt"],
  }),
  body("workspaceId").exists(),
  body("environment").exists(),
  param("folderId").not().isIn(["root"]).exists(),
  validateRequest,
  deleteFolder
);

router.get(
  "/",
  requireAuth({
    acceptedAuthModes: ["jwt"],
  }),
  query("workspaceId").exists().isString().trim(),
  query("environment").exists().isString().trim(),
  query("parentFolderId").optional().isString().trim(),
  validateRequest,
  getFolders
);

export default router;
