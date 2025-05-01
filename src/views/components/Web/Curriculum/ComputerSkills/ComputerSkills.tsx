import React from 'react';
import { useNearScreen } from 'hooks/useNearScreen';
import { Progress, Row, Col } from 'antd';
import './ComputerSkills.scss';

export default function ComputerSkills() {
  const [show, el] = useNearScreen();
  const ref: any = el;
  return (
    <div className="computer-skills">
      <div className="use-near-screen" ref={ref}>
        {show && (
          <>
            <h2>Competencias Informáticas</h2>
            <Row>
              <Col span={24} sm={12} className="computer-skills__col">
                <Skill skill="HTML5" percent={70} status="active" />
                <Skill skill="CSS3" percent={70} status="active" />
                <Skill skill="SASS" percent={70} status="active" />
                <Skill skill="Bootstrap" percent={85} status="active" />
                <Skill skill="Ant-Design" percent={85} status="active" />
                <Skill skill="Javascript" percent={60} status="active" />
                <Skill skill="TypeScript" percent={40} status="active" />
                <Skill skill="NodeJS" percent={40} status="active" />
                <Skill skill="ExpressJS" percent={60} status="active" />
                <Skill skill="React" percent={70} status="active" />
              </Col>
              <Col span={24} sm={12} className="computer-skills__col">
                <Skill skill="Angular" percent={40} />
                <Skill skill="JQuery" percent={20} />
                <Skill skill="PHP" percent={40} status="active" />
                <Skill skill="Laravel" percent={60} status="active" />
                <Skill skill="Symfony" percent={20} />
                <Skill skill="MongoDB" percent={40} status="active" />
                <Skill skill="MySQL" percent={40} />
                <Skill skill="MariaDB" percent={40} status="active" />
                <Skill skill="Git" percent={50} status="active" />
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  );
}

function Skill(props: any) {
  const { skill, percent, status = 'normal' } = props;
  return (
    <div className="computer-skills__skill">
      {skill}
      <span className="computer-skills__skill-progress">
        <Progress
          strokeColor={{
            from: '#5d718d',
            to: '#273b56',
          }}
          percent={percent}
          status={status}
          showInfo={false}
        />
      </span>
    </div>
  );
}
