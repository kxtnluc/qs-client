import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SyntheticEvent, useEffect, useState } from 'react';
import { getQuestionsGrouped, getQuestionsGroupedandUser } from '../../managers/questionManager';
import { Question, QuestionGroup, UserQuestion, UserQuestionDTO } from '../../types/QuestionTypes';
import { Button, Card, Icon, IconButton, TextField, Tooltip } from '@mui/material';
import "./MyHome.css";
import SaveIcon from '@mui/icons-material/Save';
import PublishIcon from '@mui/icons-material/Publish';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';
import { createUserQuestion, getUsersUserQuestions, updateUserQuestion } from '../../managers/userQuestionManager';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SpeedDialComponent from '../misc/SpeedDialComponent';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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

  const [reload, setReload] = useState<boolean>(false)

  const [editMode, setEditMode] = useState<boolean>(false);
  const [newQuestionsMode, setNewQuestionsMode] = useState<boolean>(false)
  const [addQuestionMode, setAddQuestionMode] = useState<boolean>(false)
  const [questionToAdd, setQuestionToAdd] = useState<any>({})

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
    const submitElement = document.getElementById(`submit-input-${question.id.toString()}`) as HTMLInputElement
    const submitBtnElement = document.getElementById(`submit-btn-${question.id.toString()}`) as HTMLInputElement

    if (submitElement) submitElement.disabled = true;
    if (submitBtnElement) {
      submitBtnElement.tabIndex = -1;
      submitBtnElement.classList.add('Mui-disabled');
    }


    // post to database
    const userQuestionObj: UserQuestionDTO = {
      userProfileId: loggedInUser.id,
      questionId: question.id,
      response: responseStates[id]
    }

    setReload(!reload)
    
    if (userQuestionObj.questionId !== undefined && userQuestionObj.response !== '' && userQuestionObj.userProfileId !== undefined && userQuestionObj.response !== undefined) {
      console.log(userQuestionObj)
      createUserQuestion(userQuestionObj)
      if (submitElement) submitElement.disabled = false;
      if (submitBtnElement) {
        submitBtnElement.tabIndex = 0;
        submitBtnElement.classList.remove('Mui-disabled');
      }
    } else {
      console.log('invalid submit')
      if (submitElement) submitElement.disabled = false;
      if (submitBtnElement) {
        submitBtnElement.tabIndex = 0;
        submitBtnElement.classList.remove('Mui-disabled');
      }
    }
    
    // setReload(!reload)

  }

  const handleAdd = (question: Question, id: number) => { //=====================SUBVMIT
    //post to database
    setAddQuestionMode(false)

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

  const handleSave = (userid: number, uq: UserQuestion) => { //=====================SAVE
    //put to database
    const userQuestionId = uq.id;
    const response = responseStates[uq.questionId]

    if (userQuestionId !== undefined && response !== undefined) {
      console.log(userQuestionId, response)
      updateUserQuestion(userQuestionId, response)
    } else console.log("invalid save");

  }

  const handleAddResponse = (q: Question) => {
    setQuestionToAdd(q);
    setAddQuestionMode(!addQuestionMode);
  }

  const handleTabOver = () => {
    setEditMode(false)
    setNewQuestionsMode(false)
    setAddQuestionMode(false)
  }



  //=====================THE RETURN




  //If user is in view mode of their data
  if (!newQuestionsMode) {

    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} textColor='inherit' onChange={handleChange} aria-label="basic tabs example">
            {questionGroups.map((q: QuestionGroup, i: number) => {
              return (
                <Tab onClick={handleTabOver} label={q.title} {...a11yProps(i)} />
              )
            })}
          </Tabs>
        </Box>
        {questionGroups.map((qg: QuestionGroup, i: number) => {
          return (
            <>
              <CustomTabPanel key={i} value={value} index={i}>
                <Card className='qg-card' sx={{ bgcolor: '#4f576f' }}>
                  <div className='qg-cardtopper'> {/*=================Header Section=================*/}
                    <div className='qg-header'>
                      {qg.title} Information
                    </div>
                    <div className='qg-edit-div'> {/* slight issue with this if statement below */}
                      <Tooltip title="New Questions"> 
                        {qg.questions.filter(q => !userQuestions.some(uq => uq.questionId === q.id)).length === 0 ?
                          <IconButton onClick={() => setNewQuestionsMode(!newQuestionsMode)} sx={{ bgcolor: "#2a303f", marginRight: "20px", borderRadius: "10px", padding: "3px", boxShadow: "20", }} className='qg-edit-button'>
                            <AddIcon sx={{ color: "lightgreen" }} fontSize='large' />
                          </IconButton>
                          :
                          <IconButton onClick={() => setNewQuestionsMode(!newQuestionsMode)} sx={{ bgcolor: "#2a303f", marginRight: "10px", borderRadius: "15px", padding: "5px", boxShadow: "20", }} className='qg-edit-button'>
                            <AddIcon sx={{ color: "lightgreen", fontSize: "44px" }} fontSize='large' />
                          </IconButton>
                        }

                      </Tooltip>


                      {editMode ?
                        (
                          <> {/*=================If Edit Mode is ACTIVE=================*/}
                            <Tooltip title="Close">
                              <IconButton onClick={() => setEditMode(!editMode)} sx={{ bgcolor: "#2a303f", borderRadius: "10px", padding: "3px", boxShadow: "20", }} className='qg-edit-button'>
                                <CloseIcon sx={{ color: "lightgreen" }} fontSize='large' />
                              </IconButton>
                            </Tooltip>
                          </>
                        )
                        :
                        (
                          <> {/*=================If Edit Mode is NOT ACTIVE=================*/}
                            {qg.questions.filter(q => !userQuestions.some(uq => uq.questionId === q.id)).length === 0 ?
                              (
                                <Tooltip title="Edit Responses">
                                  <IconButton onClick={() => setEditMode(!editMode)} sx={{ bgcolor: "#2a303f", borderRadius: "10px", padding: "3px", boxShadow: "20", }} className='qg-edit-button'>
                                    <ModeEditIcon sx={{ color: "lightgreen" }} fontSize='large' />
                                  </IconButton>
                                </Tooltip>
                              ) : ("")}

                          </>
                        )}


                    </div>
                  </div>
                  <div>
                    {editMode ?
                      <ul className='q-ul'> {/*=================If Edit Mode is ACTIVE, displays previously answered questions, but now editable and saveable=================*/}
                        {userQuestions.filter(uq => uq.question.questionGroupId === qg.id).map((uq: UserQuestion, i: number) => {
                          return (
                            <li key={i} className='q-li'>

                              <Card raised elevation={24} sx={{ '&:hover': { scale: 1.5 }, bgcolor: "#FCFAFF" }} className='q-card'>
                                <div className='q-body'>
                                  {i + 1}: {uq.question.body}
                                </div>
                                <div className='q-save'> {/*=================BELOW, checks if user has inputed any new info into the edit field=================*/}
                                  {uq.response === responseStates[uq.questionId] || responseStates[uq.questionId] === '' ?
                                    <Tooltip title='Save'>
                                      <IconButton color='primary' size='large' disabled className='q-save-btn'><SaveIcon fontSize='large' /></IconButton>
                                    </Tooltip>
                                    :
                                    <Tooltip title='Save'>
                                      <IconButton color='primary' size='large' onClick={() => handleSave(loggedInUser.id, uq)} className='q-save-btn'><SaveIcon fontSize='large' /></IconButton>
                                    </Tooltip>
                                  }

                                </div>
                                <div className='q-response'>
                                  <TextField onChange={(e) => handleInputChange(e, uq.questionId)} placeholder={uq.response} className='q-response-input' size='small' type='text' value={responseStates[uq.questionId] || ''}
                                    onKeyUp={(e) => {
                                      if (e.key === "Enter") handleSave(loggedInUser.id, uq)
                                    }}
                                  />
                                </div>
                              </Card>

                            </li>
                          )
                        })}
                      </ul>
                      :
                      <> {/*=================If Edit Mode is NOT ACTIVE=================*/}
                        {addQuestionMode ?
                          <ul className='q-ul'> {/*=================If User is Adding ANOTHER Response=================*/}
                            <li className='q-li'>
                              <div className='q-container'>
                                <Card raised elevation={24} sx={{ '&:hover': { scale: 1.5 }, bgcolor: "#FCFAFF", }} className='q-card'>
                                  <div className='q-body'>
                                    Add: {questionToAdd.body}
                                  </div>
                                  <div className='q-submit'>
                                    <IconButton color='primary' size='small' onClick={() => handleAdd(questionToAdd, questionToAdd.id)} className='q-save-btn'><AddIcon fontSize='large' /></IconButton>
                                  </div>
                                  <div className='q-response'>
                                    <TextField onChange={(e) => handleInputChange(e, questionToAdd.id)} className='q-response-input' size='small' type='text' value={responseStates[questionToAdd.id] || ''}
                                      onKeyUp={(e) => {
                                        if (e.key === "Enter") handleAdd(questionToAdd, questionToAdd.id)
                                      }}
                                    />
                                  </div>
                                </Card>
                                <Tooltip title="Close">
                                  <IconButton sx={{ marginTop: "0.7rem" }} className='q-add' onClick={() => setAddQuestionMode(false)}>
                                    <CloseIcon sx={{ color: "lightgreen" }} className='q-add-btn' fontSize='large' />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            </li>
                          </ul>
                          :
                          <ul className='q-ul'> {/*=================If Edit Mode is NOT ACTIVE, and they are NOT ADDING ANOTHER RESPONSE, displays all of users answered questions=================*/}
                            {userQuestions.filter(uq => uq.question.questionGroupId === qg.id).length === 0 ?
                              (
                                <div className='q-container' style={{ marginLeft: "25%", marginRight: "25%", marginBottom: "2%" }}>
                                  <Card raised elevation={24} sx={{ '&:hover': { scale: 1.5 }, bgcolor: "#FCFAFF" }} className='q-card'>
                                    <div className='q-body' style={{ fontSize: "2rem", textAlign: "center", fontWeight: "600" }}>
                                      No Responses Found
                                      <Tooltip title="New Questions">
                                        <IconButton onClick={() => setNewQuestionsMode(!newQuestionsMode)} sx={{ '&:hover': { bgcolor: '#4f576f' }, marginBottom: "5px", marginLeft: "20px", bgcolor: "#2a303f", borderRadius: "10px", padding: "1px", boxShadow: "20", }} className='qg-edit-button'>
                                          <AddIcon sx={{ color: "lightgreen" }} fontSize='large' />
                                        </IconButton>
                                      </Tooltip>
                                    </div>
                                  </Card>
                                </div>
                              )
                              : ("")}
                            {userQuestions.filter(uq => uq.question.questionGroupId === qg.id).map((uq: UserQuestion, i: number) => {
                              return (
                                <li key={i} className='q-li'>
                                  {uq.question.multipleResponses ?
                                    (
                                      <div className='q-container' style={{display: "flex"}}>
                                        <Card raised elevation={24} sx={{ '&:hover': { scale: 1.5 }, bgcolor: "#FCFAFF", height: "80px" }} className='q-card'>
                                          <div className='q-body' style={{ fontSize: "15px" }}>
                                            {uq.question.body}
                                          </div>
                                          <div className='q-save' style={{ marginTop: "-1.2rem" }}>
                                            <SpeedDialComponent setEditMode={setEditMode} setReload={setReload} reload={reload} userQuestion={uq} />
                                          </div>
                                          <div className='q-response' style={{ paddingBottom: "0.75rem", fontSize: "24px" }}>
                                            {uq.response !== undefined ? (uq.response) : ("loading")}
                                          </div>
                                        </Card>
                                        <Tooltip title="Add Response">
                                          <IconButton className='q-add' onClick={() => handleAddResponse(uq.question)}>
                                            <AddIcon sx={{ color: "lightgreen" }} className='q-add-btn' fontSize='large' />
                                          </IconButton>
                                        </Tooltip>
                                      </div>
                                    )
                                    :
                                    (
                                      <div className='q-container'>
                                        <Card raised elevation={24} sx={{ '&:hover': { scale: 1.5 }, bgcolor: "#FCFAFF", height: "80px" }} className='q-card'>
                                          <div className='q-body' style={{ fontSize: "15px" }}>
                                            {uq.question.body}
                                          </div>
                                          <div className='q-save' style={{ marginTop: "-1.2rem" }}>
                                            <SpeedDialComponent setEditMode={setEditMode} setReload={setReload} reload={reload} userQuestion={uq} />
                                          </div>
                                          <div className='q-response' style={{ paddingBottom: "0.75rem", fontSize: "24px" }}>
                                            {uq.response !== undefined ? (uq.response) : ("loading")}
                                          </div>
                                        </Card>

                                      </div>
                                    )}
                                </li>
                              )
                            })}
                          </ul>
                        }
                      </>
                    }

                  </div>
                </Card>
              </CustomTabPanel >
            </>
          )
        })
        }

      </Box >
    );


  }
  else if (newQuestionsMode) {
    return (
      <>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} textColor='inherit' onChange={handleChange} aria-label="basic tabs example">
              {questionGroups.map((q: QuestionGroup, i: number) => {
                return (
                  <Tab onClick={handleTabOver} label={q.title} {...a11yProps(i)} />
                )
              })}
            </Tabs>
          </Box>
          {questionGroups.map((qg: QuestionGroup, i: number) => {
            return (
              <>
                <CustomTabPanel key={i} value={value} index={i}>
                  <Card className='qg-card' sx={{ bgcolor: '#4f576f' }}>
                    <div className='qg-cardtopper'>
                      <div className='qg-header'>
                        {qg.title} Information
                      </div>
                      <div className='qg-edit-div'>
                        <Tooltip title="Back">
                          <IconButton onClick={() => setNewQuestionsMode(!newQuestionsMode)} sx={{ bgcolor: "#2a303f", marginRight: "20px", borderRadius: "10px", padding: "3px", boxShadow: "20", }} className='qg-edit-button'>
                            <ArrowBackIosNewIcon sx={{ color: "lightgreen" }} fontSize='large' />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                    <div>
                      {qg.questions.filter(q => !userQuestions.some(uq => uq.questionId === q.id)).length === 0 ?
                        <div className='q-container' style={{ marginLeft: "25%", marginRight: "25%", marginBottom: "2%" }}>
                          <Card raised elevation={24} sx={{ '&:hover': { scale: 1.5 }, bgcolor: "#FCFAFF" }} className='q-card'>
                            <div className='q-body' style={{ fontSize: "2rem", textAlign: "center", fontWeight: "600" }}>
                              No Questions Available
                              <Tooltip title="Back">
                                <IconButton onClick={() => setNewQuestionsMode(!newQuestionsMode)} sx={{ '&:hover': { bgcolor: '#4f576f' }, marginBottom: "5px", marginLeft: "20px", bgcolor: "#2a303f", borderRadius: "10px", padding: "1px", boxShadow: "20", }} className='qg-edit-button'>
                                  <ArrowBackIosNewIcon sx={{ color: "lightgreen" }} fontSize='large' />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </Card>
                        </div>
                        :
                        (
                          <>
                            <ul className='q-ul'>
                              {qg.questions.filter(q => !userQuestions.some(uq => uq.questionId === q.id)).map((q: Question, i: number) => {
                                return (
                                  <li key={i} className='q-li'> {/* This IF Statment below is not working */}
                                    <div className='q-container'>
                                      <Card raised elevation={24} sx={{ '&:hover': { scale: 1.5 }, bgcolor: "#FCFAFF", }} className='q-card'>
                                        <div className='q-body'>
                                          {i + 1} {q.body}
                                        </div>
                                        <div className='q-submit'>
                                          <IconButton disabled={false} id={`submit-btn-${q.id.toString()}`} color='primary' size='small' onClick={() => handleSubmit(q, q.id)} className='q-save-btn'><PublishIcon fontSize='large' /></IconButton>
                                        </div>
                                        <div className='q-response'>
                                          <TextField disabled={false} id={`submit-input-${q.id.toString()}`} onChange={(e) => handleInputChange(e, q.id)} className='q-response-input' size='small' type='text' value={responseStates[q.id] || ''}
                                            onKeyUp={(e) => {
                                              if (e.key === "Enter") handleSubmit(q, q.id)
                                            }}
                                          />
                                        </div>
                                      </Card>
                                    </div>
                                  </li>
                                )
                              })
                              }
                            </ul>
                          </>
                        )
                      }

                    </div>
                  </Card>
                </CustomTabPanel>
              </>
            )
          })}

        </Box>
      </>
    )
  }

  return <>Error. please try reloading the page.</>
}
