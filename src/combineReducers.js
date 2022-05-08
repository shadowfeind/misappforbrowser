import { combineReducers } from "redux";
import {
  downloadAssignmentStudentReducer,
  downloadSubmittedAssignmentStudentReducer,
  getAllAssignmentStudentReducer,
  getAssignmentListStudentReducer,
  getSingleAssignmentStudentReducer,
  putSingleAssignmentStudentReducer,
} from "./student/assignment/assignment/AssignmentReducers";
import {
  getAllOtherOptionsForStudentReducer,
  getAllStudentAttendanceReducer,
  getEnglishDateStudentReducer,
  getListStudentAttendanceReducer,
} from "./student/attendance/studentMonthlyPresentSheet/StudentMonthlyPresentSheetReducers";

import { getAllClassScheduleStudentReducer } from "./student/classSchedule/ClassScheduleReducer";
import {
  getDashboardContentStudentReducer,
  getHeaderContentReducer,
} from "./student/dashboard/DashboardReducers";

import {
  getFCMTokenReducer,
  userLoginReducer,
} from "./student/login/LoginReducers";

import {
  downloadOldQuestionsStudentReducer,
  getAllOldQuestionsStudentReducer,
  getListOldQuestionsStudentReducer,
  getSubjectOptionsForOldQuestionsStudentReducer,
} from "./student/oldQuestions/OldQuestionsReducers";
import {
  getAllUploadPhotoStudentReducer,
  uploadPhotoStudentReducer,
} from "./student/pid/uploadPhoto/UploadPhotoReducers";
import {
  downloadNewResourcesStudentReducer,
  getAllNewResourcesStudentReducer,
  getNewResourcesStudentListReducer,
} from "./student/resources/newResourcesStudent/NewResourcesStudentReducers";

import { getAllSyllabusStudentReducer } from "./student/syllabus/SyllabusReducers";

//Teacher Import

import {
  createAcademicGradingReducer,
  getAllAcademicGradingReducer,
  getSingleAcademicGradingforEditReducer,
  getSingleAcademicGradingReducer,
  updateSingleAcademicGradingReducer,
} from "./teacher/academicGrading/AcademicGradingReducers";
import {
  createExamDivisionReducer,
  getAllExamDivisionReducer,
  getSingleExamDivisionEditReducer,
  getSingleExamDivisionReducer,
  updateSingleExamDivisionReducer,
} from "./teacher/examDivision/ExamDivisionReducers";
import {
  getAllAcademicStudentExamdataReducer,
  getEventReducer,
  getEventScheduleReducer,
  getExamEntryBulkReducer,
  getExamEntrySearchDataReducer,
} from "./teacher/examMarkEntry/ExamMarkEntryReducers";

import {
  getAllExamScheduleInitialDataReducer,
  getExamScheduleListReducer,
} from "./teacher/examSchedule/ExamScheduleReducers";
import {
  getAllContactAddress,
  getSingleContactAddressReducer,
  updateSingleContactAddressReducer,
} from "./teacher/pid/contactAddress/ContactAddressReducers";
import {
  getAllContactNumber,
  getSingleContactNumberReducer,
  updateSingleContactNumberReducer,
} from "./teacher/pid/contactNumber/ContactNumberReducers";
import {
  createSingleEducationReducer,
  educationCreateReducer,
  getAllEducation,
  getAllEducationCreateReducer,
  getSingleEducationReducer,
  updateSingleEducationReducer,
} from "./teacher/pid/education/EducationReducers";
import {
  getAllEmail,
  getSingleEmailReducer,
  updateSingleEmailReducer,
} from "./teacher/pid/email/EmailReducers";
import {
  createSingleFamilyMemberReducer,
  familyMemberCreateReducer,
  getAllFamilyMember,
  getAllFamilyMemberCreateReducer,
  getSingleCreateFamilyMemberReducer,
  getSingleFamilyMemberReducer,
  updateSingleFamilyMemberReducer,
} from "./teacher/pid/familyMember/FamilyMemberReducers";
import {
  getAllGuardian,
  getSingleGuardianReducer,
  updateSingleGuardianReducer,
} from "./teacher/pid/gurdian/GuardianReducers";
import {
  createSingleHobbyReducer,
  getAllHobby,
  getAllHobbyCreateReducer,
  getSingleHobbyReducer,
  hobbyCreateReducer,
  updateSingleHobbyReducer,
} from "./teacher/pid/hobby/HobbyReducers";
import {
  createSingleJobHistoryReducer,
  getAllJobHistory,
  getAllJobHistoryCreateReducer,
  getSingleJobHistoryReducer,
  jobHistoryCreateReducer,
  updateSingleJobHistoryReducer,
} from "./teacher/pid/jobHistory/JobHistoryReducers";
import {
  getAllPersonalInformation,
  getSinglePersonalInformationReducer,
  getTeacherResetPasswordReducer,
  updateSinglePersonalInformationReducer,
} from "./teacher/pid/personalinformation/PersonalInformationReducers";
import {
  createSingleSkillReducer,
  getAllSkill,
  getAllSkillCreateReducer,
  getSingleSkillReducer,
  skillCreateReducer,
  updateSingleSkillReducer,
} from "./teacher/pid/skill/SkillReducers";
import {
  createSingleTrainingReducer,
  getAllTraining,
  getAllTrainingCreateReducer,
  getSingleTrainingReducer,
  trainingCreateReducer,
  updateSingleTrainingReducer,
} from "./teacher/pid/training/TrainingReducers";
import {
  getAllUploadPhotoTeacherReducer,
  uploadPhotoTeacherReducer,
} from "./teacher/pid/uploadPhoto/UploadPhotoReducers";
import {
  getAllOtherOptionsForSelectReducer,
  getAllStudentMonthlyPresentSheetReducer,
  getEnglishDateReducer,
  getListForPresentStudentReducer,
  getListForUpdateStudentPresentReducer,
  getListStudentPresentReducer,
  getSubjectOptionsForSelectReducer,
  postListStudentPresentReducer,
} from "./teacher/attendance/studentMonthlyPresentSheet/StudentMonthlyPresentSheetReducers";
import {
  getAllTotalStudentAttendanceReducer,
  getListTotalStudentAttendanceReducer,
} from "./teacher/attendance/totalStudentAttendance/TotalStudentAttendanceReducers";
import {
  downloadResourceReducer,
  getAllInitialDataFromSubjectReducer,
  getAllInitialResourcesDataReducer,
  getAllOtherOptionsForResourcesSelectReducer,
  getAllResourcesListReducer,
  getCreateResourceReducer,
  postResourceReducer,
} from "./teacher/resources/ResourcesReducers";
import {
  downloadAssignmentReducer,
  downloadSubmittedAssignmentReducer,
  getAllAssignmentTeacherReducer,
  getAllOtherOptionsForAssignmentSelectReducer,
  getListTeacherAssignmentReducer,
  getSingleCreateTeacherAssignmentReducer,
  getSingleToEditTeacherAssignmentReducer,
  getTeacherAssignmentContentReducer,
  postTeacherAssignmentReducer,
  putSingleToEditTeacherAssignmentReducer,
} from "./teacher/assignment/AssignmentReducers";
import {
  getActiveSubjectReducer,
  getAllOtherOptionsForSelectTeacherReducer,
  getBulkExamMarkApprovalSearchDataReducer,
  getExamMarkApprovalInitialDataReducer,
  getExamMarkApprovalScheduleHeaderReducer,
  getExamMarkApprovalSearchDataReducer,
  postBulkExamMarkApprovalReducer,
} from "./teacher/examMarkApprovalTeacher/examMarkApproval/ExamMarkApprovalReducers";
import {
  getAllPgClassScheduleReducer,
  getListClassScheduleReducer,
  putClassScheduleReducer,
} from "./teacher/classSchedule/pg/ClassPgScheduleReducers";
import {
  downloadOldQuestionsReducer,
  getAllOldQuestionsTeacherReducer,
  getListOldQuestionsTeacherReducer,
  getSubjectOldQuestionsReducer,
} from "./teacher/oldQuestions/OldQuestionsReducers";
import {
  getAllSyllabusReducer,
  getListSyllabusReducer,
} from "./teacher/syllabus/syllabusPg/SyllabusReducers";
import { getDashboardContentReducer } from "./teacher/dashboard/DashboardReducers";
import { getAllHoliday } from "./student/holiday/HolidayReducers";
import {
  studentDeleteLeaveRequestReducer,
  studentDownloadLeaveRequestReducer,
  studentGetAllLeaveRequestReducer,
  studentGetListLeaveRequestReducer,
  studentGetSingleCreateLeaveRequestReducer,
  studentGetSingleDeleteLeaveRequestReducer,
  studentGetSingleEditLeaveRequestReducer,
  studentPostLeaveRequestReducer,
  studentPutLeaveRequestReducer,
} from "./student/leaveRequest/StudentLeaveRequestReducers";
import {
  deleteLeaveRequestReducer,
  downloadLeaveRequestReducer,
  getAllLeaveRequestReducer,
  getListLeaveRequestReducer,
  getSingleCreateLeaveRequestReducer,
  getSingleDeleteLeaveRequestReducer,
  getSingleEditLeaveRequestReducer,
  getSingleEditSentLeaveRequestReducer,
  postLeaveRequestReducer,
  putLeaveRequestReducer,
} from "./teacher/leaveRequest/TeacherLeaveRequestReducers";
import { getStudentResetPasswordReducer } from "./student/pid/personalinformation/PersonalInformationReducers";

export const reducers = combineReducers({
  getFCMToken: getFCMTokenReducer,
  userLogin: userLoginReducer,
  getHeaderContent: getHeaderContentReducer,
  getDashboardContentStudent: getDashboardContentStudentReducer,
  //user profile reducers starts
  //PID uploadPhoto
  uploadPhotoStudent: uploadPhotoStudentReducer,
  getAllUploadPhotoStudent: getAllUploadPhotoStudentReducer,
  getStudentResetPassword: getStudentResetPasswordReducer,
  //user profile reducers ends
  //attendance start
  getAllStudentAttendance: getAllStudentAttendanceReducer,
  getListStudentAttendance: getListStudentAttendanceReducer,
  getAllOtherOptionsForStudent: getAllOtherOptionsForStudentReducer,
  //attendance end
  //Resources(New Resources Student Reducers)
  getAllNewResourcesStudent: getAllNewResourcesStudentReducer,
  getNewResourcesStudentList: getNewResourcesStudentListReducer,
  downloadNewResourcesStudent: downloadNewResourcesStudentReducer,
  //Assignment Reducers
  getAllAssignmentStudent: getAllAssignmentStudentReducer,
  getAssignmentListStudent: getAssignmentListStudentReducer,
  getSingleAssignmentStudent: getSingleAssignmentStudentReducer,
  putSingleAssignmentStudent: putSingleAssignmentStudentReducer,
  downloadAssignmentStudent: downloadAssignmentStudentReducer,
  downloadSubmittedAssignmentStudent: downloadSubmittedAssignmentStudentReducer,
  //ClassSchedule Reducer
  getAllClassScheduleStudent: getAllClassScheduleStudentReducer,
  //OldQuestions Reducers
  getAllOldQuestionsStudent: getAllOldQuestionsStudentReducer,
  getSubjectOptionsForOldQuestionsStudent:
    getSubjectOptionsForOldQuestionsStudentReducer,
  getListOldQuestionsStudent: getListOldQuestionsStudentReducer,
  downloadOldQuestionsStudent: downloadOldQuestionsStudentReducer,
  //Syllabus Teacher
  getAllSyllabusStudent: getAllSyllabusStudentReducer,
  //holiday calendar
  holiday: getAllHoliday,
  //leave request student
  studentGetAllLeaveRequest: studentGetAllLeaveRequestReducer,
  studentGetListLeaveRequest: studentGetListLeaveRequestReducer,
  studentGetSingleCreateLeaveRequest: studentGetSingleCreateLeaveRequestReducer,
  studentGetSingleEditLeaveRequest: studentGetSingleEditLeaveRequestReducer,
  studentPostLeaveRequest: studentPostLeaveRequestReducer,
  studentPutLeaveRequest: studentPutLeaveRequestReducer,
  studentGetSingleDeleteLeaveRequest: studentGetSingleDeleteLeaveRequestReducer,
  studentDeleteLeaveRequest: studentDeleteLeaveRequestReducer,
  studentDownloadLeaveRequest: studentDownloadLeaveRequestReducer,

  //TEACHER COMBINE REDUCERS:
  getDashboardContent: getDashboardContentReducer,
  getAllAcademicStudentExamdata: getAllAcademicStudentExamdataReducer,
  getEvent: getEventReducer,
  getEventSchedule: getEventScheduleReducer,
  getExamEntrySearchData: getExamEntrySearchDataReducer,
  getExamEntryBulk: getExamEntryBulkReducer,
  academicGrading: getAllAcademicGradingReducer,
  getSingleAcademicGrading: getSingleAcademicGradingReducer,
  createAcademicGrading: createAcademicGradingReducer,
  getSingleAcademicGradingforEdit: getSingleAcademicGradingforEditReducer,
  updateSingleAcademicGrading: updateSingleAcademicGradingReducer,
  getAllExamDivision: getAllExamDivisionReducer,
  getSingleExamDivision: getSingleExamDivisionReducer,
  createExamDivision: createExamDivisionReducer,
  getSingleExamDivisionEdit: getSingleExamDivisionEditReducer,
  updateSingleExamDivision: updateSingleExamDivisionReducer,
  getAllExamScheduleInitialData: getAllExamScheduleInitialDataReducer,
  getExamScheduleList: getExamScheduleListReducer,
  //PID PersonalInformation
  getAllPersonalInformation: getAllPersonalInformation,
  getTeacherResetPassword: getTeacherResetPasswordReducer,
  getSinglePersonalInformation: getSinglePersonalInformationReducer,
  updateSinglePersonalInformation: updateSinglePersonalInformationReducer,
  //PID ContactAddress
  getAllContactAddress: getAllContactAddress,
  getSingleContactAddress: getSingleContactAddressReducer,
  updateSingleContactAddress: updateSingleContactAddressReducer,
  //PID ContactNumber
  getAllContactNumber: getAllContactNumber,
  getSingleContactNumber: getSingleContactNumberReducer,
  updateSingleContactNumber: updateSingleContactNumberReducer,
  //PID Education
  getAllEducation: getAllEducation,
  getAllEducationCreate: getAllEducationCreateReducer,
  createSingleEducation: createSingleEducationReducer,
  educationCreate: educationCreateReducer,
  //PID Email
  getAllEmail: getAllEmail,
  getSingleEmail: getSingleEmailReducer,
  updateSingleEmail: updateSingleEmailReducer,
  //PID FamilyMember
  getAllFamilyMember: getAllFamilyMember,
  getAllFamilyMemberCreate: getAllFamilyMemberCreateReducer,
  createSingleFamilyMember: createSingleFamilyMemberReducer,
  familyMemberCreate: familyMemberCreateReducer,
  //PID Guardian
  getAllGuardian: getAllGuardian,
  getSingleGuardian: getSingleGuardianReducer,
  updateSingleGuardian: updateSingleGuardianReducer,
  //PID Hobby
  getAllHobby: getAllHobby,
  getAllHobbyCreate: getAllHobbyCreateReducer,
  createSingleHobby: createSingleHobbyReducer,
  hobbyCreate: hobbyCreateReducer,
  //PID JobHistory
  getAllJobHistory: getAllJobHistory,
  getAllJobHistoryCreate: getAllJobHistoryCreateReducer,
  createSingleJobHistory: createSingleJobHistoryReducer,
  jobHistoryCreate: jobHistoryCreateReducer,
  //PID Skill
  getAllSkill: getAllSkill,
  getAllSkillCreate: getAllSkillCreateReducer,
  createSingleSkill: createSingleSkillReducer,
  skillCreate: skillCreateReducer,
  //PID Training
  getAllTraining: getAllTraining,
  getAllTrainingCreate: getAllTrainingCreateReducer,
  createSingleTraining: createSingleTrainingReducer,
  trainingCreate: trainingCreateReducer,
  //PID UploadPhoto
  getAllUploadPhotoTeacher: getAllUploadPhotoTeacherReducer,
  uploadPhotoTeacher: uploadPhotoTeacherReducer,
  //attendance start
  getAllStudentMonthlyPresentSheet: getAllStudentMonthlyPresentSheetReducer,
  getAllOtherOptionsForSelect: getAllOtherOptionsForSelectReducer,
  getSubjectOptionsForSelect: getSubjectOptionsForSelectReducer,
  getEnglishDate: getEnglishDateReducer,
  getListStudentPresent: getListStudentPresentReducer,
  getListForUpdateStudentPresent: getListForUpdateStudentPresentReducer,
  getListForPresentStudent: getListForPresentStudentReducer,
  postListStudentPresent: postListStudentPresentReducer,
  getAllTotalStudentAttendance: getAllTotalStudentAttendanceReducer,
  getListTotalStudentAttendance: getListTotalStudentAttendanceReducer,
  //attendance end
  //resources start
  getAllInitialResourcesData: getAllInitialResourcesDataReducer,
  getAllInitialDataFromSubject: getAllInitialDataFromSubjectReducer,
  getAllOtherOptionsForResourcesSelect:
    getAllOtherOptionsForResourcesSelectReducer,
  getAllResourcesList: getAllResourcesListReducer,
  getCreateResource: getCreateResourceReducer,
  postResource: postResourceReducer,
  downloadResource: downloadResourceReducer,
  //resources end
  //assignment start
  getAllAssignmentTeacher: getAllAssignmentTeacherReducer,
  getAllOtherOptionsForAssignmentSelect:
    getAllOtherOptionsForAssignmentSelectReducer,
  getListTeacherAssignment: getListTeacherAssignmentReducer,
  getEnglishDate: getEnglishDateReducer,
  getSingleCreateTeacherAssignment: getSingleCreateTeacherAssignmentReducer,
  postTeacherAssignment: postTeacherAssignmentReducer,
  getTeacherAssignmentContent: getTeacherAssignmentContentReducer,
  getSingleToEditTeacherAssignment: getSingleToEditTeacherAssignmentReducer,
  putSingleToEditTeacherAssignment: putSingleToEditTeacherAssignmentReducer,
  downloadAssignment: downloadAssignmentReducer,
  downloadSubmittedAssignment: downloadSubmittedAssignmentReducer,
  //assignment end
  //ExamMarkApproval(Teacher)
  getExamMarkApprovalInitialData: getExamMarkApprovalInitialDataReducer,
  getExamMarkApprovalSearchData: getExamMarkApprovalSearchDataReducer,
  getExamMarkApprovalScheduleHeader: getExamMarkApprovalScheduleHeaderReducer,
  getBulkExamMarkApprovalSearchData: getBulkExamMarkApprovalSearchDataReducer,
  postBulkExamMarkApproval: postBulkExamMarkApprovalReducer,
  getAllOtherOptionsForSelectTeacher: getAllOtherOptionsForSelectTeacherReducer,
  getActiveSubject: getActiveSubjectReducer,

  //class schedule reducers starts
  getAllPgClassSchedule: getAllPgClassScheduleReducer,
  getListClassSchedule: getListClassScheduleReducer,

  //class schedule reducers ends
  //OldQuestion reducers starts
  getAllOldQuestionsTeacher: getAllOldQuestionsTeacherReducer,
  getListOldQuestionsTeacher: getListOldQuestionsTeacherReducer,
  getSubjectOldQuestions: getSubjectOldQuestionsReducer,
  downloadOldQuestions: downloadOldQuestionsReducer,
  //Syllabus Teacher
  getAllSyllabus: getAllSyllabusReducer,
  getListSyllabus: getListSyllabusReducer,
  //leave request teacher
  getAllLeaveRequest: getAllLeaveRequestReducer,
  getListLeaveRequest: getListLeaveRequestReducer,
  getSingleCreateLeaveRequest: getSingleCreateLeaveRequestReducer,
  getSingleEditLeaveRequest: getSingleEditLeaveRequestReducer,
  postLeaveRequest: postLeaveRequestReducer,
  putLeaveRequest: putLeaveRequestReducer,
  getSingleDeleteLeaveRequest: getSingleDeleteLeaveRequestReducer,
  deleteLeaveRequest: deleteLeaveRequestReducer,
  downloadLeaveRequest: downloadLeaveRequestReducer,
  getSingleEditSentLeaveRequest: getSingleEditSentLeaveRequestReducer,
});
