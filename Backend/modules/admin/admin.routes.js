const express = require("express");
const {
  viewRequests,
  handleRequest,
  monitorUsers,
} = require("./controllers/userManagement");
const { getStats } = require("./controllers/dashboardStats");
const {
  getDashboardStats,
  getEventStatusData,
  getVisitorStatistics,
} = require("./controllers/adminDashboard");
const {
  uploadPostEventMaterials,
} = require("./controllers/postEventMaterials");
const { auth, roleAuth } = require("../../middlewares/auth");

const adminRouter = express.Router();

adminRouter.use(auth);
adminRouter.get("/view-requests", roleAuth(["admin"]), viewRequests);
adminRouter.post("/handle-request", roleAuth(["admin"]), handleRequest);
adminRouter.get("/monitor-users", roleAuth(["admin"]), monitorUsers);
adminRouter.get("/stats", roleAuth(["admin"]), getStats);
//adminRouter.post("/upload-material", upload.single("material"), uploadPostEventMaterials);
// Dashboard Statistics Route
adminRouter.get("/dashboard/stats", roleAuth(["admin"]), getDashboardStats);

// Event Status Data Route
adminRouter.get(
  "/dashboard/event-status",
  roleAuth(["admin"]),
  getEventStatusData
);

// Visitor Statistics Route
adminRouter.get(
  "/dashboard/visitor-stats",
  roleAuth(["admin"]),
  getVisitorStatistics
);

module.exports = adminRouter;
