import React, { useCallback, useEffect, useState, useContext } from 'react';
import { IBoardDTO } from '../../dto/IBoardDTO';
import axios from 'axios';
import List from '../list.component';
import { ListData } from '../types/ListData';
import CreateBoard from './CreateBoard.componen';
import Toast from '../toast';
import { UserContext } from '../home/UserContext';

const BoardComponent: React.FC=() => {
    const [boards, setBoards] = useState<IBoardDTO[]>([]);
    const [listBoards, setListBoards] = useState<ListData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { user, isAuthenticated } = useContext(UserContext);

    const receiveData = (board: IBoardDTO) =>{
        const addToList = {
            column1Name: board.boardTitle,
            column2Owner: board.boardOwner
        } as ListData;

        setListBoards([...listBoards, addToList])
    }

    const getBoards = useCallback(async ()=>{
        try{
            const response = await axios.get(
                "http://localhost:3000/boards/by-user",
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            )

            setListBoards(response.data)
            Toast.showSuccess("Your boards are loaded");
        }catch (error) {
            console.error("Error creating board:", error);
            Toast.showFailure("Error creating board. Please try again.");
        }
    }, [])

    useEffect(() => {
        const eventSource = new EventSource("http://localhost:3000/boards/sse-boards")
        
        eventSource.onerror = (error) => {
            console.log("SSE error:", error);
        };

        eventSource.onmessage = (event) =>{
            const data = JSON.parse(event.data);
            setTimeout(() => {
                getBoards()
            }, 1000);

            return data;
        }
        return () => {
            eventSource.close();
        };
       // eslint-disable-next-line
    }, []);

    useEffect(() =>{
        getBoards()
       // eslint-disable-next-line
    }, [])

    function openBoard(data: string): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div className='section-boards'>
            <List
                title='Boards'
                data={listBoards}
                custom={<CreateBoard onDataReceived={receiveData}/>}
                openModalToUpdate={openBoard}
            />
        </div>
    );
}

export default BoardComponent;