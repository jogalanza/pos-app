import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    boardTitle: "",
    darkMode: 0,
    installable: false,
    installPrompt: null,
    connectionInfo: null,
    wsConnected: false,
    wsName: null,
    appNewUpdates: null,
    hasNewUpdates: false,
    currentPeriod: null,

    adhocTour: false,
    appSessionInfo: {
      Users: 0,
      Sessions: 0
    },
    serverResources: {
      CPU: "N/A",
      RAM: "N/A"
    }
  }),

  getters: {
    CurrentYear: (state) => {
      return state.currentYear === 0 ? new Date().getFullYear() : state.currentYear;
    },
    ActiveDashboard: (state) => {
      return { ...state.activeDashboard };
    },
    ActiveBoards: (state) => {
      return { ...state.activeBoards };
    },
    DashboardFilter: (state) => {
      return state.dashboardFilter;
    },
    getAppName: () => {
      return "App Name";
    },
    BoardTitle: (state) => {
      return state.boardTitle;
    },
    Years: (state) => {
      
      var currentYear = state.currentYear === 0 ? new Date().getFullYear() : state.currentYear;
      var years = [currentYear - 1, currentYear, currentYear + 1];
      // var startYear = 2020;
      // while (startYear <= currentYear) {
      //   years.push(startYear++);
      // }
      return years; //.reverse();
    },
    SnapshotYears: (state) => {
      return [...state.snapshotYears];
    },
    SelectYears: (state) => {
      var currentYear = state.currentYear === 0 ? new Date().getFullYear() : state.currentYear;
      var years = [currentYear - 1, currentYear, currentYear + 1];

        if (state.snapshot.Enabled){
          years = [state.snapshot.Year - 1, state.snapshot.Year, state.snapshot.Year + 1];
        }
      // var startYear = 2020;
      // while (startYear <= currentYear) {
      //   years.push(startYear++);
      // }
      return years; //.reverse();
    },
    AccessModes() {
      return [
        { label: "No access", value: 0 },
        { label: "Read only", value: 1 },
        { label: "Read and Write", value: 2 }
      ]
    },
    Months() {
      return [
        { label: "January", value: 1 },
        { label: "February", value: 2 },
        { label: "March", value: 3 },
        { label: "April", value: 4 },
        { label: "May", value: 5 },
        { label: "June", value: 6 },
        { label: "July", value: 7 },
        { label: "August", value: 8 },
        { label: "September", value: 9 },
        { label: "October", value: 10 },
        { label: "November", value: 11 },
        { label: "December", value: 12 },
      ];
    },
    Weeks() {
      var weeks = [];
      var seed = 1;
      while (seed <= 53) {
        weeks.push(seed);
        seed++;
      }
      return weeks;
    },
    Quarters() {
      var weeks = [];
      var seed = 1;
      while (seed <= 53) {
        weeks.push(seed);
        seed++;
      }
      return [
        { label: "Q1", value: 1 },
        { label: "Q2", value: 2 },
        { label: "Q3", value: 3 },
        { label: "Q4", value: 4 },
      ];
    },
    Snapshot: (state) => {
      return { ...state.snapshot };
    },
    AppSessionInfo(state) {
      return {...state.appSessionInfo};
    },
    ServerResources(state) {
      return {...state.serverResources};
    },
    DarkMode(state) {
      return state.darkMode == 1;
    },
    Installable(state) {
      return state.installable;
    },
    InstallPrompt(state) {
      return state.installPrompt;
    },
    ConnectionInfo(state) {
      return state.connectionInfo;
    },
    CurrentPeriod(state) {
      return state.currentPeriod;
    },
  },

  actions: {
    SyncAppSessionInfo(payload){
      this.appSessionInfo = {...payload};
    },
    SyncServerResources(payload){
      this.serverResources = {...payload};
    },
    UpdateBoardTitle(payload) {
      this.boardTitle = payload;
    },
    SetAdHocTour(payload){
      this.adhocTour = payload;
    },
    UpdateDarkMode(payload) {
      this.darkMode = payload;
      window.localStorage.setItem("darkMode", payload);
    },
    SetInstallPrompt(payload) {
      this.installPrompt = payload;
    },
    SetInstallable(payload) {
      this.installable = payload;
    },
    UpdateSocketStatus(data) {
      this.wsConnected = data;
      if (!data) this.wsName = null;
    },
    UpdateSocketName(data) {
      this.wsName = data;
    },
    SetAppUpdate(data) {
      this.appNewUpdates = data;
      this.hasNewUpdates = true;
    },
    SetHasNewUpdates(data) {
      this.hasNewUpdates = data;
    },
    SetActiveRole(data) {
      this.activeRole = { ...data };
    },
  },
});
