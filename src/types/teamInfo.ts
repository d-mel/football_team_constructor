export type TeamInfoType = {
  couch: {
    id: string;
    name: string;
    photoSettings: {
      left: number;
      src: string;
      top: number;
      width: number;
    };
  };
  logo: {
    id: string;
    name: string;
    city: string;
    photoSettings: {
      left: number;
      src: string;
      top: number;
      width: number;
    };
  };
  bg: {
    photoSettings: {
      left: number;
      src: string;
      top: number;
      width: number;
    };
  };
  team: {
    id: number;
    position: number;
    name: string;
    number: number;
    photoSettings: {
      left: number;
      src: string;
      top: number;
      width: number;
    };
  }[];
};
