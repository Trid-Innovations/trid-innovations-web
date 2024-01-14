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
  logo: Image;
  menu: AMenu[];
}
export interface AMenu extends sanityBody {
  _type: "menuItem";
  title: localeString;
}
