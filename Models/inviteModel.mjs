import { DataTypes } from "sequelize";
import db from "../db.mjs";
import User from "./userModel.mjs";

const Invite = db.define("invite", {
  inviteLink: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

Invite.sync()
  .then(() => {
    console.log("INVITE synchronized");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

export default Invite;
