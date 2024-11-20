const ROOTS = {
  admin: "/admin",
  publicApi: "/public",
  public: "/",
  configuration: "/configuration",
};

export const paths = {
  auth: {
    forgotpassword: "/forgotpassword",
    signup: "/signup",
    login: "/login",
    error: "/auth/error",
  },
  configuration: {
    authConfiguration: `${ROOTS.configuration}/auth`,
    contactConfiguration: `${ROOTS.configuration}/contact`,
    logoConfiguration: `${ROOTS.configuration}/logo`,
  },

  admin: {
    dashboard: `${ROOTS.admin}`,
    dashboardapi: `${ROOTS.admin}/dashboard`,

    profile: `${ROOTS.admin}/profile`,
    changepassword: `${ROOTS.admin}/profile/changepassword`,
    billings: `${ROOTS.admin}/profile/billings`,

    players: `${ROOTS.admin}/players`,
    addPlayers: `${ROOTS.admin}/players/add`,
    editPlayers: `${ROOTS.admin}/players/edit`,
    playersProfile: `${ROOTS.admin}/players/profile`,
    playersReport: `${ROOTS.admin}/players/report`,


    courts: `${ROOTS.admin}/courts`,
    addCourts: `${ROOTS.admin}/courts/add`,
    editCourts: `${ROOTS.admin}/courts/edit`,

    timeslots: `${ROOTS.admin}/courts/fsdf`,
    createbook: `${ROOTS.admin}/courts/confirmation`,

    booknow: `${ROOTS.admin}/book-now`,
    bookings: `${ROOTS.admin}/bookings`,
    addBookings: `${ROOTS.admin}/bookings/add`,
    editBookings: `${ROOTS.admin}/bookings/edit`,

    playertable: `${ROOTS.admin}/playertable`,
    addplayertable: `${ROOTS.admin}/playertable/add`,

    gallery: `${ROOTS.admin}/gallery`,
    addgallery: `${ROOTS.admin}/gallery/add`,

    newsevents: `${ROOTS.admin}/news-events`,
    addNewsEvents: `${ROOTS.admin}/news-events/add`,
    editNewsEvents: `${ROOTS.admin}/news-events/edit`,

    amenities: `${ROOTS.admin}/amenities`,
    support: `${ROOTS.admin}/support`,

    plans: `${ROOTS.admin}/plans`,
  },

  public: {
    landing: `${ROOTS.public}`,
    gallery: `${ROOTS.public}gallery`,
    newsEvents: `${ROOTS.public}news-and-events`,
    bookNow: `${ROOTS.public}book-now`,
  },

  publicApi: {
    courts: `${ROOTS.publicApi}/courts`,
    profile: `${ROOTS.publicApi}/profile`,
    gallery: `${ROOTS.publicApi}/gallery`,
    amenities: `${ROOTS.publicApi}/amenities`,
    newsEvents: `${ROOTS.publicApi}/news-events`,
  },
};
