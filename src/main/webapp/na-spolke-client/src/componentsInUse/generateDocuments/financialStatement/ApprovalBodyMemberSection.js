import {Box} from "@mui/material";
import {ApprovalBodyMember} from "./ApprovalBodyMember";
import Card from "@mui/material/Card";

export function ApprovalBodyMemberSection({values, setFieldValue, handleChange, company}) {

    return <Card>
            {company.boardMembers > 0 && <Card>
            <p>Głosowanie nad absolutorium Zarządu</p>
            <p>Wskaż wszystkich członków zarządu oraz okresy sprawowania przez nich funkcji</p>
            {company.boardMembers.length > 0 && company.boardMembers.map(member => {
                return <ApprovalBodyMember setFieldValue={setFieldValue} values={values} member={member}
                                           handleChange={handleChange}
                                           memberType={`board${member.boardMemberId}`}/>
            })}
        </Card>}

        {company.boardOfDirectors.length > 0 && <Box>
            <p>Głosowanie nad absolutorium członków Rady Nadzorczej</p>
            <p>Wskaż wszystkich członków rady nadzorczej oraz okresy sprawowania przez nich funkcji</p>

            {company.boardOfDirectors.length > 0 && company.boardOfDirectors.map(member => {
                return <ApprovalBodyMember setFieldValue={setFieldValue} values={values} member={member}
                                           handleChange={handleChange}
                                           memberType={`director${member.boardOfDirectorId}`}/>
            })}
        </Box>}
    </Card>

}