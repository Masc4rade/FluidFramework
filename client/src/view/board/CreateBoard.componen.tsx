import React, { Component } from "react";
import Modal from "react-modal";
import Toast from "../toast";
import axios from "axios";

type Props = {
  onDataReceived: (data: State['boardData']) => void;
};

type State = {
  isModalOpen: boolean,
  boardData: {
    boardOwner: string,
    boardTitle: string,
    boardEntries: string[],
    boardNRow: number,
    boardNCol: number,
    boardPermissions: string[],
  },
};

const defaultData = {
    boardOwner: "",
    boardTitle: "",
    boardEntries: [],
    boardNRow: -1,
    boardNCol: -1,
    boardPermissions: []
};

export default class CreateBoard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalOpen: false,
      boardData: {...defaultData },
    };
  }

  openModal = () => {
    this.setState({
      isModalOpen: true,
      boardData: {...defaultData},
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      boardData: {...defaultData},
    });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      boardData: {
        ...prevState.boardData,
        [name]: value,
      },
    }));
  };

  handleAddBoard = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.state.boardData.boardTitle === ""
    || this.state.boardData.boardNCol === -1
    || this.state.boardData.boardNRow === -1)
    {
      Toast.showFailure("Please fill all fields correctly.");
      return;
    }
    try {
        const response = await axios.post(
          "http://localhost:3000/boards",
          {
            boardOwner: this.state.boardData.boardOwner,
            boardTitle: this.state.boardData.boardTitle,
            boardNRow: this.state.boardData.boardNRow,
            boardNCol: this.state.boardData.boardNCol
          },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
  
        this.props.onDataReceived(response.data);
  
        Toast.showSuccess("Board created successfully.");
      } catch (error) {
        console.error("Error creating board:", error);
        Toast.showFailure("Error creating board. Please try again.");
      }
  
    this.closeModal();
  }

  render() {
    return (
      <div>
        <div className="list_add" onClick={this.openModal}>
          <p><i className="material-icons">&#xE145;</i></p>
        </div>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          contentLabel="Create Building Modal"
          style={{
            content: {
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '460px',
              background: '#243b55'
            },
          }}
        >
          <form className="building" onSubmit={this.handleAddBoard}>
            <h2 className="building-title">Create Building</h2>
            <input
              type="text"
              name="boardTitle"
              value={this.state.boardData.boardTitle}
              onChange={this.handleInputChange}
              placeholder="Board Title"
              pattern="^[a-zA-Z0-9\s]+$"
              title="Only letters, numbers, and spaces are allowed."
              maxLength={50}
            />
            <input
              type="number"
              name="boardNCol"
              value={this.state.boardData.boardNCol}
              onChange={this.handleInputChange}
              placeholder="Number of Columns"
              pattern="^[a-zA-Z0-9\s]+$"
              title="Only numbers are allowed."
            />
            <input
              type="number"
              name="boardNRow"
              value={this.state.boardData.boardNRow}
              onChange={this.handleInputChange}
              placeholder="Number of Rows"
              title="Only numbers are allowed."
            />

            <div className="wrapper-buttons">
              <button className="button form-submit-button" type="submit">Create</button>
              <button className="button form-close-button" type="button" onClick={this.closeModal}>Cancel</button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}
