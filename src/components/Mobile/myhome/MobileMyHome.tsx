import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Card, Icon, IconButton, TextField, Tooltip } from '@mui/material';
import "./MobileMyHome.css";
import SaveIcon from '@mui/icons-material/Save';
import PublishIcon from '@mui/icons-material/Publish';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Question, QuestionGroup, UserQuestion, UserQuestionDTO } from '../../../types/QuestionTypes';
import { getQuestionsGroupedandUser } from '../../../managers/questionManager';
import { createUserQuestion, getUsersUserQuestions, updateUserQuestion } from '../../../managers/userQuestionManager';
import { ValidateUserSub } from '../../scripts/ValidateUserSub';
import { Lock } from '@mui/icons-material';
import MobileSpeedDialComponent from '../misc/MobileSpeedDialComponent';

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

export const MobileMyHome = ({ loggedInUser }: any) => {

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
      updateUserQuestion(userQuestionId, response).then(() => setReload(!reload))
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


  ValidateUserSub(loggedInUser)

  //If user is in view mode of their data
  if (!newQuestionsMode) {

    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs variant='scrollable' scrollButtons allowScrollButtonsMobile value={value} textColor='inherit' onChange={handleChange} aria-label="basic tabs example">
            {questionGroups.map((q: QuestionGroup, i: number) => {

              if (q.title === 'User') return <Tab disabled={false} onClick={handleTabOver} label={q.title} {...a11yProps(i)} />

              else if (!loggedInUser.paidUser) return <Tab icon={<Lock />} disabled={!loggedInUser.paidUser} onClick={handleTabOver} {...a11yProps(i)} />

              else return <Tab label={q.title} disabled={!loggedInUser.paidUser} onClick={handleTabOver} {...a11yProps(i)} />

            })}
          </Tabs>
        </Box>
        {questionGroups.map((qg: QuestionGroup, i: number) => {
          return (
            <>
              <CustomTabPanel key={i} value={value} index={i}>
                <div className='m-qg-edit-div'> {/* slight issue with this if statement below */}
                  <Tooltip title="New Questions">
                    {qg.questions.filter(q => !userQuestions.some(uq => uq.questionId === q.id)).length !== 0 && !editMode ?
                      <IconButton onClick={() => setNewQuestionsMode(!newQuestionsMode)} sx={{ bgcolor: "#2a303f", borderRadius: "10px", boxShadow: "20", }} className='m-qg-edit-button'>
                        <AddIcon sx={{ color: "lightgreen"}} fontSize='medium' />
                      </IconButton>
                      :
                      <></>
                    }

                  </Tooltip>


                  {editMode ?
                    (
                      <> {/*=================If Edit Mode is ACTIVE=================*/}
                        <Tooltip title="Close">
                          <IconButton onClick={() => setEditMode(!editMode)} sx={{ bgcolor: "#2a303f", borderRadius: "10px", boxShadow: "20", }} className='m-qg-edit-button'>
                            <CloseIcon sx={{ color: "lightgreen" }} fontSize='medium' />
                          </IconButton>
                        </Tooltip>
                      </>
                    )
                    :
                    (
                      <> {/*=================If Edit Mode is NOT ACTIVE=================*/}
                        {qg.questions.filter(q => userQuestions.some(uq => uq.questionId === q.id)).length >= 1 ?
                          (
                            <Tooltip title="Edit Responses">
                              <IconButton onClick={() => setEditMode(!editMode)} sx={{ bgcolor: "#2a303f", borderRadius: "10px", boxShadow: "20", }} className='m-qg-edit-button'>
                                <ModeEditIcon sx={{ color: "lightgreen" }} fontSize='medium' />
                              </IconButton>
                            </Tooltip>
                          ) : ("")}

                      </>
                    )}


                </div>
                <Card className='m-qg-card' sx={{ bgcolor: '#4f576f' }}>
                  <div className='m-qg-cardtopper'> {/*=================Header Section=================*/}
                    <div className='m-qg-header'>
                      {!editMode ?
                        (`${qg.title} Info`) :
                        (`Edit ${qg.title} Info`)}
                    </div>
                  </div>
                  <div>
                    {editMode ?
                      <ul className='m-q-ul'> {/*=================If Edit Mode is ACTIVE, displays previously answered questions, but now editable and saveable=================*/}
                        {userQuestions.filter(uq => uq.question.questionGroupId === qg.id).map((uq: UserQuestion, i: number) => {
                          return (
                            <li key={i} className='m-q-li'>

                              <Card raised elevation={24} sx={{ bgcolor: "#FCFAFF" }} className='m-q-card'>
                                <div className='m-q-body'>
                                  {i + 1}: {uq.question.body}
                                </div>
                                <div className='m-q-save'> {/*=================BELOW, checks if user has inputed any new info into the edit field=================*/}
                                  {uq.response === responseStates[uq.questionId] || responseStates[uq.questionId] === '' || responseStates[uq.questionId] === undefined ?
                                    <Tooltip title='Save'>
                                      <IconButton color='primary' size='large' disabled className='m-q-save-btn'><SaveIcon fontSize='large' /></IconButton>
                                    </Tooltip>
                                    :
                                    <Tooltip title='Save'>
                                      <IconButton color='primary' size='large' onClick={() => handleSave(loggedInUser.id, uq)} className='m-q-save-btn'><SaveIcon fontSize='large' /></IconButton>
                                    </Tooltip>
                                  }

                                </div>
                                <div className='m-q-textfield-div'>
                                  <TextField sx={{ width: "80%" }} onChange={(e) => handleInputChange(e, uq.questionId)} placeholder={uq.response} className='m-q-response-input' size='small' type='text' value={responseStates[uq.questionId] || ''}
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
                          <ul className='m-q-ul'> {/*=================If User is Adding ANOTHER Response=================*/}
                            <li className='m-q-li'>
                              <div className='m-q-container' style={{ display: "flex" }}>
                                <Card raised elevation={24} sx={{ width: "90%", height: "5em", bgcolor: "#FCFAFF", }} className='m-q-card'>
                                  <div className='m-q-body'>
                                    Add: {questionToAdd.body}
                                  </div>
                                  <div className='m-q-submit'>
                                    <IconButton style={{ marginTop: "-0.2em" }} color='primary' size='small' onClick={() => handleAdd(questionToAdd, questionToAdd.id)} className='m-q-save-btn'><AddIcon fontSize='large' /></IconButton>
                                  </div>
                                  <div className='m-q-textfield-div'>
                                    <TextField sx={{ width: "80%" }} onChange={(e) => handleInputChange(e, questionToAdd.id)} className='m-q-response-input' size='small' type='text' value={responseStates[questionToAdd.id] || ''}
                                      onKeyUp={(e) => {
                                        if (e.key === "Enter") handleAdd(questionToAdd, questionToAdd.id)
                                      }}
                                    />
                                  </div>
                                </Card>
                                <Tooltip title="Close">
                                  <IconButton className='m-q-add' onClick={() => setAddQuestionMode(false)}>
                                    <CloseIcon sx={{ color: "lightgreen" }} className='m-q-add-btn' fontSize='large' />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            </li>
                          </ul>
                          :
                          <ul className='m-q-ul'> {/*=================If Edit Mode is NOT ACTIVE, and they are NOT ADDING ANOTHER RESPONSE, displays all of users answered questions=================*/}
                            {userQuestions.filter(uq => uq.question.questionGroupId === qg.id).length === 0 ?
                              (
                                <div className='m-q-container' >
                                  <Card raised elevation={24} sx={{ bgcolor: "#FCFAFF" }} className='m-q-card'>
                                    <div className='m-q-body' style={{ fontSize: "1em", textAlign: "center", fontWeight: "600" }}>
                                      No Responses Found
                                    </div>
                                  </Card>
                                </div>
                              )
                              : ("")}
                            {userQuestions.filter(uq => uq.question.questionGroupId === qg.id).map((uq: UserQuestion, i: number) => {
                              return (
                                <li key={i} className='m-q-li'>
                                  {uq.question.multipleResponses ?
                                    (
                                      <div className='m-q-container' style={{ display: "flex" }}> {/* this one funky */}
                                        <Card raised elevation={24} sx={{ width: "90%", bgcolor: "#FCFAFF" }} className='m-q-card'>
                                          <div className='m-q-body'>
                                            {uq.question.body}
                                          </div>
                                          <div className='m-q-dial'>
                                          </div>
                                          <div className='m-q-response'>
                                            {uq.response !== undefined ? (uq.response) : ("loading")}
                                          </div>
                                        </Card>
                                        <Tooltip title="Add Response">
                                          <IconButton className='m-q-add' onClick={() => handleAddResponse(uq.question)}>
                                            <AddIcon sx={{ color: "lightgreen" }} className='m-q-add-btn' fontSize='large' />
                                          </IconButton>
                                        </Tooltip>
                                      </div>
                                    )
                                    :
                                    (
                                      <div className='m-q-container'>
                                        <Card raised elevation={24} sx={{ bgcolor: "#FCFAFF" }} className='m-q-card'>
                                          <div className='m-q-body'>
                                            {uq.question.body}
                                          </div>
                                          <div className='m-q-dial'>
                                          </div>
                                          <div className='m-q-response'>
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
            <Tabs variant='scrollable' scrollButtons allowScrollButtonsMobile value={value} textColor='inherit' onChange={handleChange} aria-label="basic tabs example">
              {questionGroups.map((q: QuestionGroup, i: number) => {

                if (q.title === 'User') return <Tab disabled={false} onClick={handleTabOver} label={q.title} {...a11yProps(i)} />

                else if (!loggedInUser.paidUser) return <Tab icon={<Lock />} disabled={!loggedInUser.paidUser} onClick={handleTabOver} {...a11yProps(i)} />

                else return <Tab label={q.title} disabled={!loggedInUser.paidUser} onClick={handleTabOver} {...a11yProps(i)} />

              })}
            </Tabs>
          </Box>
          {questionGroups.map((qg: QuestionGroup, i: number) => {
            return (
              <>
                <CustomTabPanel key={i} value={value} index={i}>
                  <div className='m-qg-edit-div'>
                    <Tooltip title="Back">
                      <IconButton onClick={() => setNewQuestionsMode(!newQuestionsMode)} sx={{ bgcolor: "#2a303f", borderRadius: "10px", boxShadow: "20", }} className='m-qg-edit-button'>
                        <ArrowBackIosNewIcon sx={{ color: "lightgreen" }} fontSize='medium' />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <Card className='m-qg-card' sx={{ bgcolor: '#4f576f' }}>
                    <div className='m-qg-cardtopper'>
                      <div className='m-qg-header'>
                        Add {qg.title} Info
                      </div>
                    </div>
                    <div>
                      {qg.questions.filter(q => !userQuestions.some(uq => uq.questionId === q.id)).length === 0 ?
                        <div className='m-q-container'>
                          <Card raised elevation={24} sx={{ bgcolor: "#FCFAFF" }} className='m-q-card'>
                            <div className='m-q-body'  style={{ fontSize: "1em", textAlign: "center", fontWeight: "600" }}>
                              All Questions Answered
                            </div>
                          </Card>
                        </div>
                        :
                        (
                          <>
                            <ul className='m-q-ul'>
                              {qg.questions.filter(q => !userQuestions.some(uq => uq.questionId === q.id)).map((q: Question, i: number) => {
                                return (
                                  <li key={i} className='m-q-li'> {/* This IF Statment below is not working */}
                                    <div className='m-q-container'>
                                      <Card raised elevation={24} sx={{ bgcolor: "#FCFAFF", height: "5em" }} className='m-q-card'>
                                        <div className='m-q-body'>
                                          {i + 1} {q.body}
                                        </div>
                                        <div className='m-q-submit'>
                                          <IconButton disabled={false} id={`submit-btn-${q.id.toString()}`} color='primary' size='small' onClick={() => handleSubmit(q, q.id)} className='m-q-save-btn'><PublishIcon fontSize='large' /></IconButton>
                                        </div>
                                        <div className='m-q-textfield-div'>
                                          <TextField sx={{ width: "80%" }} disabled={false} id={`submit-input-${q.id.toString()}`} onChange={(e) => handleInputChange(e, q.id)} className='m-q-response-input' size='small' type='text' value={responseStates[q.id] || ''}
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
