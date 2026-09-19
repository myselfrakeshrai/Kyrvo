export interface Member {
  Name: string;
  Designation: string;
  Image: string;
}

interface Team {
  [key: string]: Member[];
}
interface Intro {
  Logo: string;
  Title: string;
  Description: string;
}

interface Vision {
  Icon?: string;
  Info: string;
  Feature: boolean;
}

export interface WhoWeAreData {
  Intro: Intro;
  Founders: Member[];
  BoardMembers: Member[];
  ExecutiveMembers: Member[];
  Visions: Vision[];
}

export default Team;
