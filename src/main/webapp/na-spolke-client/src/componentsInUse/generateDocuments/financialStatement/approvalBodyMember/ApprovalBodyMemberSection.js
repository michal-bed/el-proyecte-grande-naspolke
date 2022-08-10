import {Box} from "@mui/material";
import {ApprovalBodyMember} from "./ApprovalBodyMember";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export function ApprovalBodyMemberSection({values, setFieldValue, handleChange, company}) {

    return <>
        {company.boardMembers.length > 0 && <Card sx={{
            minWidth: 275, width: '80%', height: '100%', margin:'auto', marginBottom: '2%',  alignContent:"center",
            alignItems: 'center', ':hover': {boxShadow: 20,},
        }}>

            <Typography sx={{fontSize: 26, marginTop: '4%'}} color="text.secondary" gutterBottom
                                   align={"center"}>
                Głosowanie nad absolutorium Zarządu</Typography>
                <Typography sx={{fontSize: 20, marginBottom: "8%"}} color="text.secondary" gutterBottom
                            align={"center"}>
                    wskaż okresy sprawowania funkcji przez Członka Zarządu</Typography>
                {company.boardMembers.length > 0 && company.boardMembers.map(member => {
                    return <ApprovalBodyMember setFieldValue={setFieldValue} values={values} member={member}
                                               handleChange={handleChange}
                                               memberType={`board${member.boardMemberId}`}/>
                })}
        </Card>}

        {company.boardOfDirectors.length > 0 && <Card sx={{
            minWidth: 275, width: '80%', height: '100%', margin:'auto',  marginBottom: '2%',
            ':hover': {boxShadow: 20,}
        }}>
            <Typography sx={{fontSize: 26, marginTop: '4%'}} color="text.secondary" gutterBottom
                        align={"center"}>
                Głosowanie nad absolutorium członków Rady Nadzorczej</Typography>
            <Typography sx={{fontSize: 20, marginBottom: "8%"}} color="text.secondary" gutterBottom
                        align={"center"}>
                wskaż okresy sprawowania funkcji przez Członka Rady Nadzorczej</Typography>

            {company.boardOfDirectors.length > 0 && company.boardOfDirectors.map(member => {
                return <ApprovalBodyMember setFieldValue={setFieldValue} values={values} member={member}
                                           handleChange={handleChange}
                                           memberType={`director${member.boardOfDirectorId}`}/>
            })}
        </Card>}
    </>

}