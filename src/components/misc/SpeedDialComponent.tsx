import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUserQuestion } from '../../managers/userQuestionManager';

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <ModeEditIcon />, name: 'Edit' },
  { icon: <DeleteIcon />, name: 'Delete' },
];

export default function SpeedDialComponent({setEditMode, setReload, reload, question}:any) {

    const handleActionEvent = async (action:string) => {
        const uqid = question.userQuestions[0].id
        console.log(question.userQuestions[0].response)
        console.log(question.id)
        console.log(action)

        if(action === "Copy"){
            // console.log("copying")
            navigator.clipboard.writeText(question.userQuestion[0].response).then(() => {
                console.log(question.userQuestion[0].response+' copied to clipboard')
            })
        }
        if(action === "Delete"){
            console.log("dddd")
            await deleteUserQuestion(uqid)
            await setReload(!reload)
        }

        if(action === "Edit"){
            console.log("edio")
            setEditMode(true)
        }
    }

  return (
    <Box sx={{bgcolor: "transparent"}}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        
        icon={<MoreVertIcon sx={{borderColor: "green"}} fontSize='large'/>}
        direction='left'
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleActionEvent(action.name)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}