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
         label={`Select Display`}
         settingsKey="dis"
          options={[
            {value: "d1", name:"Display 1"},
            {value: "d2", name:"Display 2"}
          ]}
      />
       <Select
         label={`Select Field`}
         settingsKey="top"
          options={[
            {value: "none", name:"None"},
            {value: "bat", name:"Battery"},
            {value: "hr", name:"Hear Rate"}   
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
          settingsKey="sep"
          label="Turn Off Separator"
        />
      </Section>    
      </Page>);
}


registerSettingsPage(mySettings);