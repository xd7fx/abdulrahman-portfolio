export type Mentorship = {
  id: string;
  titleKey: string;
  organizationKey: string;
  periodKey: string;
  descriptionKey: string;
  summaryKey?: string;
  image?: string;
  file?: string;
  link?: string;
};

export const mentorship: Mentorship[] = [
  {
    "id": "agentx-eastern",
    "summaryKey": "mentorSummaryAgentxEastern",
    "file": "/certificates/agentx-eastern-mentoring.pdf",
    "titleKey": "mentorAgentxEasternTitle",
    "organizationKey": "mentorAgentxEasternOrg",
    "periodKey": "mentorAgentxEasternPeriod",
    "descriptionKey": "mentorAgentxEasternDesc",
    "image": "/mentorship/agentx-eastern.jpg"
  },
  {
    "id": "agentx-qassim",
    "summaryKey": "mentorSummaryAgentxQassim",
    "file": "/certificates/agentx-qassim-mentoring.pdf",
    "titleKey": "mentorAgentxQassimTitle",
    "organizationKey": "mentorAgentxQassimOrg",
    "periodKey": "mentorAgentxQassimPeriod",
    "descriptionKey": "mentorAgentxQassimDesc",
    "image": "/mentorship/agentx-qassim.jpg"
  },
  {
    "id": "buildx-workshop",
    "summaryKey": "mentorSummaryBuildxWorkshop",
    "titleKey": "mentorBuildxWorkshopTitle",
    "organizationKey": "mentorBuildxWorkshopOrg",
    "periodKey": "mentorBuildxWorkshopPeriod",
    "descriptionKey": "mentorBuildxWorkshopDesc"
  },
  {
    "id": "drone-360",
    "summaryKey": "mentorSummaryDrone360",
    "titleKey": "mentorDrone360Title",
    "organizationKey": "mentorDrone360Org",
    "periodKey": "mentorDrone360Period",
    "descriptionKey": "mentorDrone360Desc",
    "image": "/courses/drone-360.jpg",
    "link": "/courses/drone-360"
  },
  {
    "id": "noura",
    "summaryKey": "mentorSummaryNoura",
    "titleKey": "mentorNouraTitle",
    "organizationKey": "mentorNouraOrg",
    "periodKey": "mentorNouraPeriod",
    "descriptionKey": "mentorNouraDesc",
    "image": "/mentorship/noura.jpg",
    "file": "/certificates/noura-mentoring.pdf"
  },
  {
    "id": "roborumble",
    "summaryKey": "mentorSummaryRoborumble",
    "titleKey": "mentorRoborumbleTitle",
    "organizationKey": "mentorRoborumbleOrg",
    "periodKey": "mentorRoborumblePeriod",
    "descriptionKey": "mentorRoborumbleDesc"
  },
  {
    "id": "yamamah",
    "summaryKey": "mentorSummaryYamamah",
    "titleKey": "mentorYamamahTitle",
    "organizationKey": "mentorYamamahOrg",
    "periodKey": "mentorYamamahPeriod",
    "descriptionKey": "mentorYamamahDesc",
    "image": "/projects/yamamah.jpg",
    "link": "/projects/yamamah"
  },
  {
    "id": "exploring-robotics",
    "summaryKey": "mentorSummaryExploringRobotics",
    "titleKey": "mentorExploringRoboticsTitle",
    "organizationKey": "mentorExploringRoboticsOrg",
    "periodKey": "mentorExploringRoboticsPeriod",
    "descriptionKey": "mentorExploringRoboticsDesc"
  }
];
