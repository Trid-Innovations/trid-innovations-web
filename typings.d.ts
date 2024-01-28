interface SanityBody {
  _createdAt: string;
  _id: string;
  _rew: string;
  _updatedAt: string;
}

interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}
export interface HeaderData extends sanityBody {
  _type: "header";
  logo: Logo;
  menu: AMenu[];
}
export interface AMenu extends sanityBody {
  _type: "menuItem";
  title: localeString;
  name: string;
}
export interface Logo extends sanityBody {
  _type: "logo";
  desktop: Image;
  mobile: Image;
}

export interface PageInfo extends sanityBody {
  _type: "homePage";
  title: localeString;
  description: localeText;
  heroImage: Image;
}
export interface Member extends sanityBody {
  _type: "member";
  picture: Image;
  title: localeString;
  name: string;
}
export interface AboutData extends sanityBody {
  _type: "about";
  title: localeString;
  description: localeText;
  members: Member[];
}

export interface Service extends SanityBody {
  _type: "service";
  title: localeString;
  description: localeString;
  image: Image;
}

export interface FooterColumn extends SanityBody {
  _type: "footerColumn";
  title: localeString;
  links: FooterLink[];
}
export interface FooterLink extends SanityBody {
  _type: "footerLink";
  title: localeString;
  url: localeString;
}
export interface FooterSocial extends SanityBody {
  _type: "social";
  title: localeString;
  url: string;
  logo: Image;
}

export interface FooterData extends SanityBody {
  _type: "footer";
  copyRights: localeString;
  termsOfUse: localeString;
  privacyPolicy: localeString;
  columns: FooterColumn[];
  socials: FooterSocial[];
}
