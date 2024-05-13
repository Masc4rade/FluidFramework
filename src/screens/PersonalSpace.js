import React, {useEffect} from "react"

export default function PersonalSpace(){

    

    return (
        <div>
            <Button
                variant="contained"
                onClick={myBoards}
                style={{ margin: "20px" }}
            >
                My boards
            </Button>
            <Button
                variant="contained"
                onClick={requestBoards}
                style={{ margin: "20px" }}
            >
                Boards with pending requests
            </Button>
        </div>
    )
}