import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SyntheticEvent, useEffect, useState } from 'react';
import { getQuestionsGrouped, getQuestionsGroupedandUser } from '../../managers/questionManager';
import { Question, QuestionGroup, UserQuestion, UserQuestionDTO } from '../../types/QuestionTypes';
import { Button, Card, Icon, IconButton, TextField } from '@mui/material';
import "./MyHome.css";
import SaveIcon from '@mui/icons-material/Save';
import PublishIcon from '@mui/icons-material/Publish';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';
import { createUserQuestion, getUsersUserQuestions, updateUserQuestion } from '../../managers/userQuestionManager';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SpeedDialComponent from '../misc/SpeedDialComponent';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const MyHome = ({ loggedInUser }: any) => {

  const [questionGroups, setQuestionGroup] = useState<Array<QuestionGroup>>([])
  const [value, setValue] = useState(0);
  const [responseStates, setResponseStates] = useState<any>({})
  const [userQuestions, setUserQuestions] = useState<Array<UserQuestion>>([])

  const [reload, setReload] = useState(false)

  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    getQuestionsGroupedandUser(loggedInUser.id).then((qgArray) => {
      setQuestionGroup(qgArray)
    });

    getUsersUserQuestions(loggedInUser.id).then(setUserQuestions)
  }, [editMode, reload])

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleInputChange = (e: any, id: number) => {
    const newResponseStates = { ...responseStates, [id]: e.target.value }
    setResponseStates(newResponseStates)
  }

  const handleSubmit = (question: Question, id: number) => { //=====================SUBVMIT
    //post to database
    const userQuestionObj: UserQuestionDTO = {
      userProfileId: loggedInUser.id,
      questionId: question.id,
      response: responseStates[id]
    }

    if (userQuestionObj.questionId !== undefined && userQuestionObj.response !== '' && userQuestionObj.userProfileId !== undefined && userQuestionObj.response !== undefined) {
      console.log(userQuestionObj)
      createUserQuestion(userQuestionObj)
      setReload(!reload)
    } else console.log('invalid submit')



  }

  const handleSave = (userid: number, questionid: number) => { //=====================SAVE
    //put to database
    const userQuestionId = userQuestions.find(uq => uq.questionId === questionid && uq.userProfileId === userid)?.id
    const response = responseStates[questionid]

    if (userQuestionId !== undefined && response !== undefined) {
      console.log(userQuestionId, response)
      updateUserQuestion(userQuestionId, response)
    } else console.log("invalid save");



  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} textColor='inherit' onChange={handleChange} aria-label="basic tabs example">
          {questionGroups.map((q: QuestionGroup, i: number) => {
            return (
              <Tab label={q.title} {...a11yProps(i)} />
            )
          })}
        </Tabs>
      </Box>
      {questionGroups.map((q: QuestionGroup, i: number) => {
        return (
          <>
            <CustomTabPanel key={i} value={value} index={i}>
              <Card className='qg-card' sx={{ bgcolor: '#4f576f' }}>
                <div className='qg-cardtopper'>
                  <div className='qg-header'>
                    {q.title} Information
                  </div>
                  <div className='qg-edit-div'>
                    <IconButton onClick={() => setEditMode(!editMode)} sx={{ bgcolor: "#2a303f", borderRadius: "10px", padding: "3px", boxShadow: "20", }} className='qg-edit-button'>
                      {editMode ? (<CloseIcon sx={{ color: "lightgreen" }} fontSize='large' />) : (<ModeEditIcon sx={{ color: "lightgreen" }} fontSize='large' />)}

                    </IconButton>
                  </div>
                </div>
                <div>
                  {editMode ?
                    <ul className='q-ul'>
                      {q.questions.map((q: Question, i: number) => {
                        return (
                          <li key={i} className='q-li'>
                            {userQuestions.some(uq => uq.questionId === q.id) ?

                              <Card raised elevation={24} sx={{ '&:hover': { scale: 1.5 }, bgcolor: "#FCFAFF" }} className='q-card'>
                                <div className='q-body'>
                                  {i + 1}: {q.body}
                                </div>
                                <div className='q-save'>
                                  <IconButton disabled color='primary' size='large' onClick={() => handleSave(loggedInUser.id, q.id)} className='q-save-btn'><SaveIcon fontSize='large' /></IconButton>
                                </div>
                                <div className='q-response'>
                                  <TextField onChange={(e) => handleInputChange(e, q.id)} placeholder={q.userQuestions[0].response} className='q-response-input' size='small' type='text' value={responseStates[q.id] || ''}
                                    onKeyUp={(e) => {
                                      if (e.key === "Enter") handleSave(loggedInUser.id, q.id)
                                    }}
                                  />
                                </div>
                              </Card>

                              :

                              <Card raised elevation={24} sx={{ '&:hover': { scale: 1.5 }, bgcolor: "#FCFAFF", }} className='q-card'>
                                <div className='q-body'>
                                  #{i + 1} {q.body}
                                </div>
                                <div className='q-submit'>
                                  <IconButton color='primary' size='small' onClick={() => handleSubmit(q, q.id)} className='q-save-btn'><PublishIcon fontSize='large' /></IconButton>
                                </div>
                                <div className='q-response'>
                                  <TextField onChange={(e) => handleInputChange(e, q.id)} className='q-response-input' size='small' type='text' value={responseStates[q.id] || ''}
                                    onKeyUp={(e) => {
                                      if (e.key === "Enter") handleSubmit(q, q.id)
                                    }}
                                  />
                                </div>
                              </Card>

                            }

                          </li>
                        )
                      })}
                    </ul>
                    :
                    <ul className='q-ul'>
                      {q.questions.map((q: Question, i: number) => {
                        return (
                          <li key={i} className='q-li'>
                            {userQuestions.some(uq => uq.questionId === q.id) ?

                              <Card raised elevation={24} sx={{ '&:hover': { scale: 1.5 }, bgcolor: "#FCFAFF", height: "80px" }} className='q-card'>
                                <div className='q-body' style={{ fontSize: "15px" }}>
                                  {q.body}
                                </div>
                                <div className='q-save' style={{ marginTop: "-1.2rem" }}>
                                  <SpeedDialComponent setEditMode={setEditMode} setReload={setReload} reload={reload} question={q} />
                                </div>
                                <div className='q-response' style={{ paddingBottom: "0.75rem", fontSize: "24px" }}>
                                  {q.userQuestions[0].response !== undefined ? (q.userQuestions[0].response) : ("loading")}
                                </div>
                              </Card>

                              :

                              <Card raised elevation={24} sx={{ '&:hover': { scale: 1.5 }, bgcolor: "#FCFAFF" }} className='q-card'>
                                <div className='q-body'>
                                  #{i + 1} {q.body}
                                </div>
                                <div className='q-submit'>
                                  <IconButton color='primary' size='small' onClick={() => handleSubmit(q, q.id)} className='q-save-btn'><PublishIcon fontSize='large' /></IconButton>
                                </div>
                                <div className='q-response'>
                                  <TextField onChange={(e) => handleInputChange(e, q.id)} className='q-response-input' size='small' type='text' value={responseStates[q.id] || ''}
                                    onKeyUp={(e) => {
                                      if (e.key === "Enter") handleSubmit(q, q.id)
                                    }} 
                                  />
                                </div>
                              </Card>

                            }

                          </li>
                        )
                      })}
                    </ul>
                  }

                </div>
              </Card>
            </CustomTabPanel>
          </>
        )
      })}

    </Box>
  );
}
