import { useNavigate } from "react-router-dom";
import { Button, Result } from '@arco-design/web-react';
import { IconHome } from '@arco-design/web-react/icon';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f2f3f5'
    }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            icon={<IconHome />}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        }
      />
    </div>
  );
}