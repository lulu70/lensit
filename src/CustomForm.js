import React, { Component, Fragment } from 'react'
import { Form, Input, Header } from 'semantic-ui-react'

class CustomForm extends Component {
  onInputChange = (e, data) => {
    this.props.onInputChange(data)
  }
  // useCustomRatioClicked = () => {
  //   this.props.onCustomRatioClicked()
  // }
  handlefocus = e => {
    this.props.handlefocus(e)
  }
  handleBlur = e => {
    this.props.handleBlur(e)
  }
  render() {
    return (
      <Fragment>
        <Header color="green" size="tiny">
          Enter Custom Resoltion
        </Header>
        <Form size="mini">
          <Form.Field
            control={Input}
            type="number"
            placeholder="Width..."
            label={{
              children: <p style={{ color: '#21ba45' }}>Width:</p>
            }}
            name="costumWidth"
            value={this.props.fields.costumWidth}
            onChange={this.onInputChange}
            onFocus={this.handlefocus}
          />
          <Form.Field
            control={Input}
            type="number"
            placeholder="Height..."
            label={{
              children: <p style={{ color: '#21ba45' }}>Height:</p>
            }}
            name="costumHeight"
            value={this.props.fields.costumHeight}
            onChange={this.onInputChange}
            onFocus={this.handlefocus}
          />
          {/* <Form.Field
            fluid
            control={Button}
            basic
            color="green"
            name="submit"
            onClick={this.useCustomRatioClicked}
          >
            Use Custom Ratio
          </Form.Field> */}
        </Form>
      </Fragment>
    )
  }
}

export default CustomForm
