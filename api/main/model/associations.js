import Student from "./Student.js";
import Project from "./Project.js";
import StudentProjectMap from "./StudentProjectMap.js";
import Supervisor from "./Supervisor.js";
import Assessment from "./Assessment.js";
import Submission from "./Submission.js";
import ProjectSubmission from "./ProjectSubmission.js";
import Client from "./Client.js";

//  Project ↔ Student association
Student.belongsToMany(Project, {
  through: StudentProjectMap,
  foreignKey: "studentId",
  as: "projects",
});

Project.belongsToMany(Student, {
  through: StudentProjectMap,
  foreignKey: "projectId",
  as: "students",
});

//  Supervisor ↔ Assessment (One-to-Many)
Supervisor.hasMany(Assessment, {
  foreignKey: "supervisorId",
  as: "assessments",
});
Assessment.belongsTo(Supervisor, {
  foreignKey: "supervisorId",
  as: "supervisor",
});

// Assessment ↔ Submission (One-to-Many)
Assessment.hasMany(Submission, {
  foreignKey: "assessmentId",
  as: "submissions",
});
Submission.belongsTo(Assessment, {
  foreignKey: "assessmentId",
  as: "assessment",
});

// Student ↔ Submission (One-to-Many)
Student.hasMany(Submission, {
  foreignKey: "studentId",
  as: "submissions",
});
Submission.belongsTo(Student, {
  foreignKey: "studentId",
  as: "student",
});

//  Project ↔ Supervisor (One-to-Many)
Supervisor.hasMany(Project, {
  foreignKey: "supervisorId",
  as: "projects",
});
Project.belongsTo(Supervisor, {
  foreignKey: "supervisorId",
  as: "supervisor",
});

// Project ↔ Client (One-to-Many)
Client.hasMany(Project, {
  foreignKey: "clientId",
  as: "projects",
});
Project.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

// Project ↔ ProjectSubmission (One-to-Many)
Project.hasMany(ProjectSubmission, {
  foreignKey: "projectId",
  as: "submissions",
});
ProjectSubmission.belongsTo(Project, {
  foreignKey: "projectId",
  as: "project",
});

// Student ↔ ProjectSubmission (One-to-Many)
Student.hasMany(ProjectSubmission, {
  foreignKey: "studentId",
  as: "projectSubmissions",
});
ProjectSubmission.belongsTo(Student, {
  foreignKey: "studentId",
  as: "student",
});
