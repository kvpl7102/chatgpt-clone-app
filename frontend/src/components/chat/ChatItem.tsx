import { Box, Avatar, Typography } from "@mui/material"
import { useAuth } from "../../context/AuthContext"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const extractCodeFromString = (message: string) => {
    if (message.includes("```")) {
        const blocks = message.split("```");
        return blocks;
    }
}

export const isCodeBlock = (str: string) => {
    if (str.includes("=") ||
        str.includes(";") || 
        str.includes("[") ||
        str.includes("]") ||
        str.includes("{") ||
        str.includes("}") ||
        str.includes("#") ||
        str.includes("//") 
    ) {
        return true;
    }
    return false
}

const ChatItem = ({
    content, 
    role
} : {content: string,  role: "user" | "assistant"
    }) => {
    const messageBlocks = extractCodeFromString(content);
    const auth = useAuth();
    const nameParts = auth?.user?.name?.split(" ");
    const initials = nameParts
      ? nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : nameParts[0].substring(0, 2)
      : "";
    return (
    role === "assistant" ? (
        <Box sx={{
            display: "flex",
            bgcolor: "#004d5612",
            p: 2,
            gap: 2,
            my: 2,
        }}>
            <Avatar sx={{ ml: "0" }}>
                <img src="openai.png" alt="openai" width={"30px"} />
            </Avatar>
            <Box >
                {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
            )
          )}
            </Box>
        </Box>
        ) : (
        <Box sx={{
            display: "flex",
            p: 2,
            gap: 2,
            my: 2,
            bgcolor: "#004d56",
        }}>
            <Avatar sx={{ ml: "0", bgcolor: "black", color: "white", }}>
                {initials.toUpperCase()}
            </Avatar>
            <Box>
                {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ fontSize: "20px" }}>{block}</Typography>
            )
          )}
            </Box>
        </Box>
    )
  )
}

export default ChatItem