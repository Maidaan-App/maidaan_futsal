const ROOTS = {
  admin: "/admin",
};

export const paths = {
  auth: {
    forgotpassword: "/forgotpassword",
    signup: "/signup",
    login: "/login",
    error: "/auth/error",
  },
  public: {},

  admin: {
    dashboard: `${ROOTS.admin}`,
    profile: `${ROOTS.admin}/profile`,
    playertable: `${ROOTS.admin}/playertable`,
    addplayertable: `${ROOTS.admin}/playertable/add`,
  },
};
