function mySettings(props){
return (
    <Page>
      <Section
        title={<Text bold align="center">Clock Display Settings</Text>}>
        <Select
          label = {`Selection`}
          settingskey="clockDisplay"
          options={[
            {name: "12h"},
            {name: "24h"}
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);