const colourSet = [
  {color: "red"}, 
  {color: "#F83C40"},
  {color: "crimson"},
  {color: "deeppink"},
  {color: "pink"},
  {color: "orangered"},
  {color: "orange"},
  {color: "#FFCC33"},
  {color: "yellow"},
  {color: "#B8FC68"},
  {color: "darkgreen"},
  {color: "seagreen"},
  {color: "olivedrab"},
  {color: "lightgreen"},
  {color: "teal"},
  {color: "lightskyblue"},
  {color: "deepskyblue"},
  {color: "dodgerblue"},
  {color: "navy"},
  {color: 'mediumpurple'},
  {color: 'mediumslateblue'},
  {color: 'purple'},
  {color: "lightgrey"},
  {color: "grey"},
  {color: "white"} 
];

function mySettings(props){
return (
    <Page>
      <Section title={<Text bold align="center">Left Panel</Text>}>
        <ColorSelect
          settingsKey="left"
          colors={colourSet}
        />
      </Section>
      <Section title={<Text bold align="center">Middle Panel</Text>}>
        <ColorSelect
          settingsKey="middle"
          colors={colourSet}
        />
      </Section>
      <Section title={<Text bold align="center">Right Panel</Text>}>
        <ColorSelect
          settingsKey="right"
          colors={colourSet}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);