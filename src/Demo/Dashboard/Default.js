import React from "react";
import { Row, Col, Card, Table, Tabs, Tab } from "react-bootstrap";

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from "../../assets/images/user/avatar-1.jpg";
import avatar2 from "../../assets/images/user/avatar-2.jpg";
import avatar3 from "../../assets/images/user/avatar-3.jpg";

import bus from "../../assets/images/bus.png";
import subway from "../../assets/images/subway.png";

import axios from "axios";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalList: [],
      busList: [],
      subwayList: [],
      log: [],
      allLog: [],
      busLog: [],
      subwayLog: [],
      totalCount: 0,
    };
  }

  componentDidMount = async () => {
    const result = [];
    let count = 0;

    const { data: bus } = await axios.get(
      "http://hsdlapi.ap-northeast-2.elasticbeanstalk.com/api/all/bus"
    );
    const { data: subway } = await axios.get(
      "http://hsdlapi.ap-northeast-2.elasticbeanstalk.com/api/all/subway"
    );

    const { data: logs } = await axios.post(
      "https://us1.prisma.sh/gwonheejun-b421fb/HSDL-Solution/dev/",
      {
        operationName: null,
        variables: {},
        query:
          "{\n  logs(last: 5) {\n    id\n    transportation {\n      title\n      type\n    }\n    placeName\n    detectiveCount\n  }\n}\n",
      }
    );

    const { data: logsss } = await axios.post(
      "https://us1.prisma.sh/gwonheejun-b421fb/HSDL-Solution/dev/",
      {
        operationName: null,
        variables: {},
        query:
          "{\n  logs {\n    id\n    transportation {\n      title\n      type\n    }\n    placeName\n    detectiveCount\n  }\n}\n",
      }
    );

    const { data: busLog } = await axios.post("https://us1.prisma.sh/gwonheejun-b421fb/HSDL-Solution/dev/", {
      operationName: null,
      variables: {},
      query:
        "{\n  logs(where: {transportation: {type: Bus}}) {\n    id\n    transportation {\n      title\n      type\n    }\n    placeName\n    detectiveCount\n  }\n}\n",
    });

    const { data: subLog } = await axios.post("https://us1.prisma.sh/gwonheejun-b421fb/HSDL-Solution/dev/", {
      operationName: null,
      variables: {},
      query:
        "{\n  logs(where: {transportation: {type: Subway}}) {\n    id\n    transportation {\n      title\n      type\n    }\n    placeName\n    detectiveCount\n  }\n}\n",
    });

    bus.map((i) => result.push(i));
    subway.map((i) => result.push(i));

    result.map((i) => {
      count += i.detectiveCount;
    });

    this.setState({
      totalList: result,
      busList: bus,
      subwayList: subway,
      totalCount: count,
      busLog: busLog.data.logs,
      log: logs.data.logs,
      subwayLog: subLog.data.logs,
      allLog: logsss.data.logs,
    });

  };
  render() {
    const tabContent = (
      <Aux>
        {this.state.allLog.map((i, ix) => {
          if (ix <= 5) {
            return (
              <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                <div className="m-r-10 photo-table">
                  <a href={DEMO.BLANK_LINK}>
                    <img
                      className="rounded-circle"
                      style={{ width: "40px" }}
                      src={i.transportation.type === "Bus" ? bus : subway}
                      alt="activity-user"
                    />
                  </a>
                </div>
                <div className="media-body">
                  <h6 className="m-0 d-inline">{i.transportation.title}</h6>
                  <span className="float-right d-flex  align-items-center">
                    {i.detectiveCount > 0 ? (
                      <>
                        <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
                        {i.detectiveCount}
                      </>
                    ) : (
                      <>
                        <i className="fa fa-caret-down f-22 m-r-10 text-c-red" />
                        {i.detectiveCount.toString().replace("-", "")}
                      </>
                    )}
                  </span>
                </div>
              </div>
            );
          } else {
            return false;
          }
        })}
      </Aux>
    );

    const tabContent2 = (
      <Aux>
        {this.state.busLog.map((i, ix) => {
          if (ix <= 5) {
            return (
              <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                <div className="m-r-10 photo-table">
                  <a href={DEMO.BLANK_LINK}>
                    <img
                      className="rounded-circle"
                      style={{ width: "40px" }}
                      src={i.transportation.type === "Bus" ? bus : subway}
                      alt="activity-user"
                    />
                  </a>
                </div>
                <div className="media-body">
                  <h6 className="m-0 d-inline">{i.transportation.title}</h6>
                  <span className="float-right d-flex  align-items-center">
                    {i.detectiveCount > 0 ? (
                      <>
                        <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
                        {i.detectiveCount}
                      </>
                    ) : (
                      <>
                        <i className="fa fa-caret-down f-22 m-r-10 text-c-red" />
                        {i.detectiveCount.toString().replace("-", "")}
                      </>
                    )}
                  </span>
                </div>
              </div>
            );
          } else {
            return false;
          }
        })}
      </Aux>
    );

    const tabContent3 = (
      <Aux>
        {this.state.subwayLog.map((i, ix) => {
          if (ix <= 5) {
            return (
              <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                <div className="m-r-10 photo-table">
                  <a href={DEMO.BLANK_LINK}>
                    <img
                      className="rounded-circle"
                      style={{ width: "40px" }}
                      src={i.transportation.type === "Bus" ? bus : subway}
                      alt="activity-user"
                    />
                  </a>
                </div>
                <div className="media-body">
                  <h6 className="m-0 d-inline">{i.transportation.title}</h6>
                  <span className="float-right d-flex  align-items-center">
                    {i.detectiveCount > 0 ? (
                      <>
                        <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
                        {i.detectiveCount}
                      </>
                    ) : (
                      <>
                        <i className="fa fa-caret-down f-22 m-r-10 text-c-red" />
                        {i.detectiveCount.toString().replace("-", "")}
                      </>
                    )}
                  </span>
                </div>
              </div>
            );
          } else {
            return false;
          }
        })}
      </Aux>
    );

    return (
      <Aux>
        <Row>
          {/* <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Daily Sales</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5"/> $249.95</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">50%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '50%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                     */}
          <Col md={6} xl={8}>
            <Card className="Recent-Users">
              <Card.Header>
                <Card.Title as="h5">실시간 마스크 미착용자</Card.Title>
              </Card.Header>
              <Card.Body className="px-0 py-2">
                <Table responsive hover>
                  <tbody>
                    {this.state.log.map((i, ix) => (
                      <tr className="unread">
                        <td>
                          <img
                            className="rounded-circle"
                            style={{ width: "40px" }}
                            src={bus}
                            alt="activity-user"
                          />
                        </td>
                        <td>
                          <h6 className="mb-1">{i.transportation.title}</h6>
                          <p className="m-0">
                            {i.placeName}{" "}
                            {i.transportation.type === "Bus" ? "정류장" : "역"}
                          </p>
                        </td>
                        <td>
                          <h6 className="text-muted">
                            <i className="fa fa-circle text-c-green f-10 m-r-15" />
                            10/24 오후 3:1{ix + 1}
                          </h6>
                        </td>
                        <td>
                          <a
                            href={DEMO.BLANK_LINK}
                            className="label theme-bg2 text-white f-12"
                          >
                            마스크 미착용
                          </a>
                          <a
                            href={DEMO.BLANK_LINK}
                            className="label theme-bg text-white f-12"
                          >
                            탑승
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card className="card-event">
              <Card.Body>
                <div className="row align-items-center justify-content-center">
                  <div className="col">
                    <h5 className="m-0">대중교통 이용자 중 마스크 미착용자</h5>
                  </div>
                  <div className="col-auto">
                    <label className="label theme-bg2 text-white f-14 f-w-400 float-right">
                      10 / 27
                    </label>
                  </div>
                </div>
                <h2 className="mt-2 f-w-300">
                  {this.state.totalCount}
                  <sub className="text-muted f-14">명</sub>
                </h2>
                <h6 className="text-muted mt-3 mb-0"></h6>
                <i className="fa fa-angellist text-c-purple f-50" />
              </Card.Body>
            </Card>
            <Card>
              <Card.Body className="border-bottom">
                <div className="row d-flex align-items-center">
                  <div className="col-auto">
                    <i className="feather icon-zap f-30 text-c-green" />
                  </div>
                  <div className="col">
                    <h3 className="f-w-300">
                      {this.state.busList.reduce(
                        (sum, i) => sum + i.detectiveCount,
                        0
                      )}
                    </h3>
                    <span className="d-block text-uppercase">
                      버스 탑승자 중 마스크 미착용
                    </span>
                  </div>
                </div>
              </Card.Body>
              <Card.Body>
                <div className="row d-flex align-items-center">
                  <div className="col-auto">
                    <i className="feather icon-map-pin f-30 text-c-blue" />
                  </div>
                  <div className="col">
                    <h3 className="f-w-300">
                      {this.state.subwayList.reduce(
                        (sum, i) => sum + i.detectiveCount,
                        0
                      )}
                    </h3>
                    <span className="d-block text-uppercase">
                      지하철 탑승자 중 마스크 미착용
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card className="card-social">
              <Card.Body className="border-bottom">
                <div className="row align-items-center justify-content-center">
                  <div className="col-auto">
                    <i className="fa fa-bus text-primary f-36" />
                  </div>
                  <div className="col text-right">
                    <h3>
                      {this.state.busList.reduce(
                        (sum, i) => sum + i.detectiveCount,
                        0
                      )}
                    </h3>
                    <h5 className="text-c-green mb-0">
                      +3.2% <span className="text-muted">금일 미착용자</span>
                    </h5>
                  </div>
                </div>
              </Card.Body>
              <Card.Body>
                <div className="row align-items-center justify-content-center card-active">
                  <div className="col-6">
                    <h6 className="text-center m-b-10">
                      <span className="text-muted m-r-5">탑승자:</span>125
                    </h6>
                    <div className="progress">
                      <div
                        className="progress-bar progress-c-theme"
                        role="progressbar"
                        style={{ width: "60%", height: "6px" }}
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <h6 className="text-center  m-b-10">
                      <span className="text-muted m-r-5">미착용자:</span>
                      {this.state.busList.reduce(
                        (sum, i) => sum + i.detectiveCount,
                        0
                      )}
                    </h6>
                    <div className="progress">
                      <div
                        className="progress-bar progress-c-theme2"
                        role="progressbar"
                        style={{ width: "45%", height: "6px" }}
                        aria-valuenow="45"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card className="card-social">
              <Card.Body className="border-bottom">
                <div className="row align-items-center justify-content-center">
                  <div className="col-auto">
                    <i className="fa fa-subway text-primary f-36" />
                  </div>
                  <div className="col text-right">
                    <h3>
                      {this.state.subwayList.reduce(
                        (sum, i) => sum + i.detectiveCount,
                        0
                      )}
                    </h3>
                    <h5 className="text-c-green mb-0">
                      +1.2% <span className="text-muted">금일 미착용자</span>
                    </h5>
                  </div>
                </div>
              </Card.Body>
              <Card.Body>
                <div className="row align-items-center justify-content-center card-active">
                  <div className="col-6">
                    <h6 className="text-center m-b-10">
                      <span className="text-muted m-r-5">탑승자:</span>25
                    </h6>
                    <div className="progress">
                      <div
                        className="progress-bar progress-c-theme"
                        role="progressbar"
                        style={{ width: "60%", height: "6px" }}
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <h6 className="text-center  m-b-10">
                      <span className="text-muted m-r-5">미착용자:</span>
                      {this.state.subwayList.reduce(
                        (sum, i) => sum + i.detectiveCount,
                        0
                      )}
                    </h6>
                    <div className="progress">
                      <div
                        className="progress-bar progress-c-theme2"
                        role="progressbar"
                        style={{ width: "45%", height: "6px" }}
                        aria-valuenow="45"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={8} className="m-b-30">
            <Tabs defaultActiveKey="전체" id="uncontrolled-tab-example">
              <Tab eventKey="전체" title="전체">
                {tabContent}
              </Tab>
              <Tab eventKey="버스" title="버스">
                {tabContent2}
              </Tab>
              <Tab eventKey="지하철" title="지하철">
                {tabContent3}
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default Dashboard;
