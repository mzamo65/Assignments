const colourSet = [
  {color: "red"}, 
  {color: "crimson"},
  {color: "violet"},
  {color: "deeppink"},
  {color: "pink"},
  {color: "orangered"},
  {color: "orange"},
  {color: "#FFCC33"},
  {color: "yellow"},
  {color: "#B8FC68"},
  {color: "darkgreen"},
  {color: "seagreen"},
  {color: "springgreen"},
  {color: "lightgreen"},
  {color: "teal"},
  {color: "lightskyblue"},
  {color: "deepskyblue"},
  {color: "dodgerblue"},
  {color: "navy"},
  {color: 'mediumpurple'},
  {color: 'purple'},
  {color: "lightgrey"},
  {color: "grey"},
  {color: "white"} 
];

function mySettings(props) {
  return (
    <Page>
      <Select
         label={`Select Font`}
         settingsKey="font"
          options={[
            {value: "digital", name:"Digital"},
            {value: "Fabrikat-Black", name:"Fabrikat"},
            {value: "Tungsten-Medium", name:"Tungsten"},
            {value: "Colfax-Thin", name:"Colfax"},
            {value: "System-Regular", name:"System"}
            
          ]}
      />
      <Section title={<Text bold align="center">Background Color</Text>}>
        <ColorSelect
          settingsKey="accentcolor"
          colors={colourSet}
        />
      </Section>
      <Section title={<Text bold align="center">Main Color</Text>}>
        <ColorSelect
          settingsKey="markercolor"
          colors={colourSet}
        />
      </Section>
      
      <Section>
        <Toggle
          settingsKey="showBackgroundGradient"
          label="Show Background Gradient"
        />
      </Section>
      <Section>
        <Toggle
          settingsKey="showBackgroundGrid"
          label="Show Background Grid"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
