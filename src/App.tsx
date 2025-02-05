import React from "react";
import "./App.css";

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: { [key: number]: string };
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      paramValues: this.initializeParamValues(props.model.paramValues),
    };
  }

  initializeParamValues(paramValues: ParamValue[]): { [key: number]: string } {
    return paramValues.reduce((acc, paramValue) => {
      acc[paramValue.paramId] = paramValue.value;
      return acc;
    }, {} as { [key: number]: string });
  }

  handleParamChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: {
        ...prevState.paramValues,
        [paramId]: value,
      },
    }));
  };

  public getModel(): Model {
    const { paramValues } = this.state;
    return {
      paramValues: Object.keys(paramValues).map((paramId) => ({
        paramId: parseInt(paramId, 10),
        value: paramValues[parseInt(paramId, 10)],
      })),
    };
  }

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div>
        {params.map((param) => (
          <div key={param.id}>
            <label>{param.name}</label>
            <input
              type="text"
              value={paramValues[param.id] || ""}
              onChange={(e) => this.handleParamChange(param.id, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  }
}

function App() {
  const params: Param[] = [
    { id: 1, name: "Назначение", type: "string" },
    { id: 2, name: "Длина", type: "string" },
  ];

  const model: Model = {
    paramValues: [
      { paramId: 1, value: "повседневное" },
      { paramId: 2, value: "макси" },
    ],
  };

  const paramEditorRef = React.useRef<ParamEditor>(null);

  const updateModel = () => {
    if (paramEditorRef.current) {
      const updatedModel = paramEditorRef.current.getModel();
      console.log("Updated Model:", updatedModel);
    }
  };

  return (
    <div>
      <ParamEditor ref={paramEditorRef} params={params} model={model} />
      <button onClick={updateModel}>Сохранить</button>
    </div>
  );
}

export default App;
