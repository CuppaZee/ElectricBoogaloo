const en_gb = [
  {
    term: "app.name",
    definition: "TODO List",
    context: "",
    term_plural: "",
    reference: "/app/modules/views",
    comment: "Please don't change the name of the application",
  },
  {
    term: "app.login.text",
    definition: "Enter your credentials below to login",
    context: "",
    term_plural: "",
    reference: "/app/modules/views",
    comment: "",
  },
  {
    term: "app.login.message.success",
    definition: "Login successful !\nWelcome back %s !",
    context: "",
    term_plural: "",
    reference: "/app/modules/views",
    comment: "",
  },
  {
    term: "app.login.message.error",
    definition: "Make sure you've entered the correct username and password",
    context: "",
    term_plural: "",
    reference: "/app/modules/views",
    comment: "",
  },
  {
    term: "app.login.password.forget",
    definition: "I forgot my password",
    context: "",
    term_plural: "",
    reference: "/app/modules/views",
    comment: "",
  },
  {
    term: "app.login.password.reset",
    definition: "Enter your address in the field below. A new password will be sent to your inbox.",
    context: "",
    term_plural: "",
    reference: "/app/modules/views",
    comment: "",
  },
  {
    term: "app.register.text",
    definition: "Sign up for free! No credit card required!",
    context: "",
    term_plural: "",
    reference: "/app/modules/views",
    comment: "",
  },
  {
    term: "app.register.message.success",
    definition:
      "Thank you for signing up !\nPlease check your email address to activate your account.",
    context: "",
    term_plural: "",
    reference: "/app/modules/views",
    comment: "",
  },
  {
    term: "app.register.message.error",
    definition: "We were unable to sign you up.\nPlease correct the marked fields.",
    context: "",
    term_plural: "",
    reference: "/app/modules/views",
    comment: "",
  },
  {
    term: "app.menu.terms",
    definition: "Terms and conditions",
    context: "",
    term_plural: "",
    reference: "/app/modules/views",
    comment: "",
  },
  {
    term: "app.login.text",
    definition: "Username",
    context: "form_label",
    term_plural: "",
    reference: "/app/modules/views",
    comment: "",
  },
  {
    term: "app.users.active",
    definition: {
      one: "Just one user online",
      other: "There are %d users online",
    },
    context: "",
    term_plural: "app.users.active",
    reference: "/app/modules/views",
    comment: "",
  },
  {
    term: "app.login.pass",
    definition: "Password",
    context: "form_label",
    term_plural: "",
    reference: "/app/modules/views",
    comment: "",
  },
] as const;

const reducer = (a: any, b: any) => {
  if (typeof b.definition === "object") {
    const x: any = {};
    let i = 0;
    for (const y in b.definition) {
      i++;
      x[`${b.term}_${i}`] = b.definition[y as keyof typeof b.definition];
    }
    return { ...a, [b.term]: b.definition };
  }
  return { ...a, [b.term]: b.definition };
};

const t = en_gb.reduce(reducer, {}) as {
  [a in typeof en_gb[number]["context"]]: {
    [b in typeof en_gb[number]["term"]]?: string;
  };
};

export default {
  // cs: x(cs, "a").a,
  // da: x(da, "a").a,
  // de: x(de, "a").a,
  "en-GB": t,
  // en: x(en_us, "a").a,
  // fi: x(fi, "a").a,
  // fr: x(fr, "a").a,
  // hu: x(hu, "a").a,
  // lt: x(lt, "a").a,
  // nl: x(nl, "a").a,
  // pt: x(pt, "a").a,
  // sv: x(sv, "a").a,
};
