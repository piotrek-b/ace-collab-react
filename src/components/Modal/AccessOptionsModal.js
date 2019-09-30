import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox, Header, Icon, Modal } from 'semantic-ui-react'
import styled from 'styled-components'

const FullDiv = styled.div`
  width: 100%;
  
  &:first-child {
    margin-bottom: 10px;
  }
`

class AccessOptionsModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      readOnly: false,
    }
  }

    confirmCallback = () => {
      const {
        resolve,
      } = this.props
      const data = { ...this.state }
      resolve({ resolved: true, ...data })
    }

    dismissCallback = () => {
      const {
        resolve,
      } = this.props
      resolve({ resolved: false })
    }

    render() {
      return (
        <Modal open size="small">
          <Header icon="pencil alternate" content="Stwórz sesję" />
          <Modal.Content>
            <FullDiv>
              <Checkbox
                onChange={() => this.setState((prevState) => ({ open: !prevState.open }))}
                checked={this.state.open}
                label="Użytkownicy mogą dołączać do sesji bez zgody administratora"
              />
            </FullDiv>
            <FullDiv>
              <Checkbox
                onChange={() => this.setState((prevState) => ({ readOnly: !prevState.readOnly }))}
                checked={this.state.readOnly}
                label="Tylko administrator sesji może edytować kod"
              />
            </FullDiv>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.dismissCallback} basic color="red">
              <Icon name="remove" /> Anuluj
            </Button>
            <Button onClick={this.confirmCallback} color="green">
              <Icon name="checkmark" /> OK
            </Button>
          </Modal.Actions>
        </Modal>
      )
    }
}

AccessOptionsModal.propTypes = {
  resolve: PropTypes.func.isRequired,
}

export default AccessOptionsModal
