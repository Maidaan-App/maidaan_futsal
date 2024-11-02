const ROOTS = {
  admin: "/admin",
  public: "/public",
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
  },

  admin: {
    dashboard: `${ROOTS.admin}`,
    profile: `${ROOTS.admin}/profile`,
    changepassword: `${ROOTS.admin}/profile/changepassword`,
    billings: `${ROOTS.admin}/profile/billings`,

    players: `${ROOTS.admin}/players`,
    addPlayers: `${ROOTS.admin}/players/add`,
    editPlayers: `${ROOTS.admin}/players/edit`,
    playersProfile: `${ROOTS.admin}/players/profile`,

    courts: `${ROOTS.admin}/courts`,
    addCourts: `${ROOTS.admin}/courts/add`,
    editCourts: `${ROOTS.admin}/courts/edit`,

    timeslots: `${ROOTS.admin}/courts/fsdf`,
    createbook: `${ROOTS.admin}/courts/confirmation`,

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


  },

  public: {
    courts: `${ROOTS.public}/courts`,
    profile: `${ROOTS.public}/profile`,
    gallery: `${ROOTS.public}/gallery`,
  },
};
