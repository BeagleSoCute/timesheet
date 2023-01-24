import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getUserDetails } from "services/user.service";
import { AppContext } from "contexts/app.context";

const ShowUserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const { setLoading } = useContext(AppContext);
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const { success, details } = await getUserDetails(userId);
      if (success) {
        setUser(details);
      }
      setLoading(false);
      return;
    };
    init();
    // eslint-disable-next-line
  }, []);
  return (
    <StyledDiv className="show-user-details">
      <p>Name: {user.name}</p>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  &.show-user-details {
  }
`;

export default ShowUserDetails;
