import React from 'react';
import ContentBlock from 'src/components/Content/ContentBlock';
import OurTeam from 'src/components/Events/OurTeam';
import { useAppStore } from 'src/stores';
import './index.css';
import PageComponent from 'src/components/Page/Page';
import KyContentSection from 'src/components/KyContentSection';
import DiscoverContent from 'src/components/Content/OurVisionContent';
import { WhoWeAreData } from 'src/models/Team';
import { getImageUrl } from 'src/utils/helpers';
const AboutPage: React.FC = () => {
  const { getCollection } = useAppStore();
  const WhoWeAreData = getCollection('WhoWeArePage') as WhoWeAreData;
  if (!WhoWeAreData) {
    return;
  }

  return (
    <KyContentSection maxWidth={'xl'}>
      <PageComponent
        isLoading={false}
        isAlert={false}
        severity="info"
        message=""
      >
        <ContentBlock
          title={'Who are we'}
          subtitle={''}
          align="center"
          description={WhoWeAreData.Intro.Description}
          imageUrl={`${
            getImageUrl(WhoWeAreData.Intro.Logo)
          }`}
        />
        <DiscoverContent
          title={'our Vision'}
          subtitle={'Empowering Minds, Cultivating Change'}
        />
        <KyContentSection maxWidth={'xl'} py={5} px={0} my={10}>
          <OurTeam
            header={'Founders'}
            team={WhoWeAreData.Founders}
            larger={true}
            scroll={false}
          />
        </KyContentSection>
        <KyContentSection maxWidth={'xl'} py={5} px={0} my={10}>
          <OurTeam
            header={'Executive Members'}
            team={WhoWeAreData.ExecutiveMembers}
            scroll={false}
            larger={true}
          />
        </KyContentSection>
        <KyContentSection maxWidth={'xl'} py={5} px={0}>
          <OurTeam
            header={'Board Members'}
            team={WhoWeAreData.BoardMembers}
            scroll={false}
          />
        </KyContentSection>
      </PageComponent>
    </KyContentSection>
  );
};

export default AboutPage;
