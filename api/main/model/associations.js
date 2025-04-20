import Student from "./Student.js";
import Project from "./Project.js";
import StudentProjectMap from "./StudentProjectMap.js";

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
