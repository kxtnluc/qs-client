import { Grid, Paper, Typography } from "@mui/material"
import { Container } from "reactstrap"

export const MobileAccountPage = ({ loggedInUser }: any) => {
    return (
        <>
            <Container dark maxWidth="sm">
                <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
                    <Typography variant="h4" gutterBottom>
                        Account Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" color="textSecondary">
                                Email
                            </Typography>
                            <Typography variant="body1">{loggedInUser.email}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    )
}