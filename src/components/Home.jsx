import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../assets/styles/buttons/btnModalBox.scss";
import Profile from "../assets/images/sampleProfile.jpg";
import HomeDate from "./HOC/buttons/HomeDate";
import "./Home.scss";

import { useFetchData } from "../components/HOC/UseFetchData";
import { useCRUD } from "../components/HOC/UseCRUD";

import StaffAdd from "./StaffAdd";
import VehicleAdd from "./VehicleAdd";

import Entry from "./site/Entry";

import Edit from "./site/Edit";
export default function Home() {
  const navigate = useNavigate();
  const {
    handleDelete,
    loading: crudLoading,
    error: crudError,
    refetch,
    deleteStatus,
  } = useCRUD();
  const {
    data: siteList,
    loading,
    error,
    refetch: refetchSiteList,
  } = useFetchData("http://localhost:8383/site/list", deleteStatus);
  const [sites, setSites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    } else {
      refetchSiteList();
    }
  }, [navigate]);

  useEffect(() => {
    if (siteList) {
      setSites(siteList);
    }
  }, [siteList]);

  const SiteDetail = ({ site }) => {
    const { data: operationData } = useFetchData(
      `http://localhost:8383/siteoperation/getBySiteId/${site.id}`
    );

    const { data: selectedStaffs } = useFetchData(
      `http://localhost:8383/siteoperationstaffvehicle/getbysiteoperationtypeid/${siteOperationId}`,
      deleteStatus
    );
    return (
      <div className="detailContainer">
        <div className="detailHeader">
          <h3>{site.name}</h3>
          {/* <h1>{site.id}</h1> */}
          <svg
            onClick={() => handleEditModelBox(site.id)}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            viewBox="0 0 18 4"
            fill="currentColor"
          >
            <path
              d="M2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0ZM16 0C14.9 0 14 0.9 14 2C14 3.1 14.9 4 16 4C17.1 4 18 3.1 18 2C18 0.9 17.1 0 16 0ZM9 0C7.9 0 7 0.9 7 2C7 3.1 7.9 4 9 4C10.1 4 11 3.1 11 2C11 0.9 10.1 0 9 0Z"
              fill="#F27D14"
            />
          </svg>
        </div>
        <>
          {operationData?.length > 0 ? (
            operationData.map((operation, index) => (
              <div className="detailContent">
                <section className="operationDetail">
                  <div key={index}>
                    <h4>
                      {operation.Operationtype?.name || "No Operation Type"}
                    </h4>

                    <div className="operationDetailInfo">
                      <div className="flexStart">
                        <svg
                          xmlns="http://ww>w.w3.org/2000/svg"
                          width="16"
                          viewBox="0 0 16 14"
                          fill="none"
                        >
                          <path
                            d="M15.1249 6.20597e-05H13.1249V1.61544C13.1249 1.771 13.0965 1.92505 13.0412 2.06877C12.9859 2.21249 12.9049 2.34308 12.8027 2.45309C12.7006 2.56309 12.5793 2.65034 12.4459 2.70988C12.3124 2.76941 12.1694 2.80005 12.0249 2.80005C11.8805 2.80005 11.7374 2.76941 11.604 2.70988C11.4705 2.65034 11.3493 2.56309 11.2471 2.45309C11.145 2.34308 11.064 2.21249 11.0087 2.06877C10.9534 1.92505 10.925 1.771 10.925 1.61544V6.20597e-05H5.10005V1.61544C5.10005 1.92962 4.98416 2.23093 4.77787 2.45309C4.57158 2.67524 4.2918 2.80005 4.00006 2.80005C3.70833 2.80005 3.42855 2.67524 3.22226 2.45309C3.01597 2.23093 2.90008 1.92962 2.90008 1.61544V6.20597e-05H0.900114C0.781128 -0.00139616 0.663078 0.0228571 0.552947 0.0713875C0.442815 0.119918 0.342839 0.19174 0.258931 0.282606C0.175023 0.373471 0.108887 0.481535 0.0644342 0.600407C0.0199816 0.719278 -0.0018847 0.846542 0.000128523 0.974673V13.0254C-0.00185795 13.1513 0.0192003 13.2763 0.0621004 13.3934C0.105 13.5105 0.168902 13.6174 0.250155 13.7079C0.331408 13.7984 0.428421 13.8708 0.535653 13.9209C0.642885 13.971 0.758235 13.9979 0.875114 14H15.1249C15.2418 13.9979 15.3571 13.971 15.4643 13.9209C15.5716 13.8708 15.6686 13.7984 15.7498 13.7079C15.8311 13.6174 15.895 13.5105 15.9379 13.3934C15.9808 13.2763 16.0019 13.1513 15.9999 13.0254V0.974673C16.0019 0.848802 15.9808 0.723742 15.9379 0.606637C15.895 0.489532 15.8311 0.382676 15.7498 0.292171C15.6686 0.201666 15.5716 0.129287 15.4643 0.0791659C15.3571 0.0290453 15.2418 0.00216561 15.1249 6.20597e-05ZM4.00006 10.7692H3.00008V9.69233H4.00006V10.7692ZM4.00006 8.07695H3.00008V7.00003H4.00006V8.07695ZM4.00006 5.38465H3.00008V4.30774H4.00006V5.38465ZM7.00002 10.7692H6.00003V9.69233H7.00002V10.7692ZM7.00002 8.07695H6.00003V7.00003H7.00002V8.07695ZM7.00002 5.38465H6.00003V4.30774H7.00002V5.38465ZM9.99997 10.7692H8.99998V9.69233H9.99997V10.7692ZM9.99997 8.07695H8.99998V7.00003H9.99997V8.07695ZM9.99997 5.38465H8.99998V4.30774H9.99997V5.38465ZM12.9999 10.7692H11.9999V9.69233H12.9999V10.7692ZM12.9999 8.07695H11.9999V7.00003H12.9999V8.07695ZM12.9999 5.38465H11.9999V4.30774H12.9999V5.38465Z"
                            fill="white"
                          />
                        </svg>
                        <p>
                          <span>
                            {operation.startDate && operation.endDate ? (
                              `${new Date(operation.startDate)
                                .toLocaleDateString("en-GB", {
                                  year: "numeric",
                                  month: "numeric",
                                  day: "numeric",
                                })
                                .replace(/\//g, "-")} ~ ${new Date(
                                operation.endDate
                              )
                                .toLocaleDateString("en-GB", {
                                  year: "numeric",
                                  month: "numeric",
                                  day: "numeric",
                                })
                                .replace(/\//g, "-")}`
                            ) : (
                              <p>No date available</p>
                            )}
                          </span>
                        </p>
                      </div>
                      <div className="flexStart">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M10.59 18.9611L10.5796 18.9629L10.5123 18.9936L10.4933 18.9971L10.48 18.9936L10.4127 18.9629C10.4026 18.96 10.395 18.9614 10.3899 18.9673L10.3861 18.9761L10.37 19.3516L10.3748 19.3691L10.3842 19.3805L10.4829 19.4455L10.4971 19.449L10.5085 19.4455L10.6071 19.3805L10.6185 19.3665L10.6223 19.3516L10.6062 18.9769C10.6036 18.9676 10.5983 18.9623 10.59 18.9611ZM10.8413 18.862L10.829 18.8637L10.6536 18.9453L10.6441 18.9541L10.6412 18.9638L10.6583 19.3411L10.6631 19.3516L10.6706 19.3577L10.8613 19.4393C10.8733 19.4423 10.8824 19.4399 10.8888 19.4323L10.8926 19.42L10.8603 18.8813C10.8572 18.8708 10.8508 18.8643 10.8413 18.862ZM10.1633 18.8637C10.1591 18.8614 10.1541 18.8606 10.1493 18.8616C10.1446 18.8626 10.1404 18.8653 10.1377 18.869L10.132 18.8813L10.0997 19.42C10.1004 19.4306 10.1057 19.4376 10.1159 19.4411L10.1301 19.4393L10.3207 19.3577L10.3302 19.3507L10.334 19.3411L10.3501 18.9638L10.3473 18.9532L10.3378 18.9445L10.1633 18.8637Z"
                            fill="white"
                          />
                          <path
                            d="M10.0278 0.309082C15.2694 0.309082 19.5183 4.23727 19.5183 9.08323C19.5183 13.9292 15.2694 17.8574 10.0278 17.8574C4.78613 17.8574 0.537201 13.9292 0.537201 9.08323C0.537201 4.23727 4.78613 0.309082 10.0278 0.309082ZM10.0278 2.06391C8.01413 2.06391 6.08295 2.80344 4.65909 4.11982C3.23523 5.4362 2.43531 7.22159 2.43531 9.08323C2.43531 10.9449 3.23523 12.7303 4.65909 14.0466C6.08295 15.363 8.01413 16.1025 10.0278 16.1025C12.0414 16.1025 13.9726 15.363 15.3964 14.0466C16.8203 12.7303 17.6202 10.9449 17.6202 9.08323C17.6202 7.22159 16.8203 5.4362 15.3964 4.11982C13.9726 2.80344 12.0414 2.06391 10.0278 2.06391ZM10.0278 3.81874C10.2602 3.81877 10.4846 3.89767 10.6583 4.04048C10.832 4.18328 10.943 4.38007 10.9702 4.5935L10.9768 4.69616V8.71998L13.5459 11.0951C13.7161 11.253 13.815 11.4649 13.8223 11.6877C13.8297 11.9106 13.745 12.1276 13.5855 12.2948C13.4261 12.462 13.2037 12.5668 12.9637 12.588C12.7237 12.6091 12.4839 12.545 12.2932 12.4086L12.204 12.3358L9.35679 9.70356C9.20928 9.56707 9.11455 9.38945 9.08725 9.19817L9.07871 9.08323V4.69616C9.07871 4.46345 9.1787 4.24028 9.35669 4.07573C9.53467 3.91118 9.77606 3.81874 10.0278 3.81874Z"
                            fill="white"
                          />
                        </svg>
                        <p>
                          <span>{operation.workinghourStart} AM</span> ~
                          <span>{operation.workinghourEnd} PM</span>
                        </p>
                      </div>
                      <div className="flexStart">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          viewBox="0 0 25 25"
                          fill="currentColor"
                        >
                          <path
                            d="M12.5002 15.625C17.1043 15.625 20.8335 17.4896 20.8335 19.7917V21.875H4.16683V19.7917C4.16683 17.4896 7.896 15.625 12.5002 15.625ZM16.6668 9.37504C16.6668 10.4801 16.2278 11.5399 15.4464 12.3213C14.665 13.1027 13.6052 13.5417 12.5002 13.5417C11.3951 13.5417 10.3353 13.1027 9.55388 12.3213C8.77248 11.5399 8.3335 10.4801 8.3335 9.37504M13.021 2.08337C13.3335 2.08337 13.5418 2.30212 13.5418 2.60421V5.72921H14.5835V3.12504C14.5835 3.12504 16.9272 4.02087 16.9272 7.03129C16.9272 7.03129 17.7085 7.17712 17.7085 8.33337H7.29183C7.34391 7.17712 8.07308 7.03129 8.07308 7.03129C8.07308 4.02087 10.4168 3.12504 10.4168 3.12504V5.72921H11.4585V2.60421C11.4585 2.30212 11.6564 2.08337 11.9793 2.08337H13.021Z"
                            fill="currentColor"
                          />
                        </svg>
                        <p>{operation.requiredStaff}</p>
                      </div>
                      <div className="flexStart">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          viewBox="0 0 20 15"
                          fill="none"
                        >
                          <path
                            d="M15.2746 0.224243H10.8396V8.12098H0.195557V11.6306H1.96956C1.96956 12.3589 2.23566 12.9731 2.75899 13.4995C3.30006 14.0172 3.91209 14.2629 4.63056 14.2629C5.34903 14.2629 5.96106 14.0172 6.50213 13.4995C7.02546 12.9731 7.29156 12.3589 7.29156 11.6306H12.1701C12.1701 12.3589 12.4184 12.9731 12.9506 13.4995C13.474 14.0172 14.0949 14.2629 14.8311 14.2629C15.5407 14.2629 16.1616 14.0172 16.6849 13.4995C17.2171 12.9731 17.4921 12.3589 17.4921 11.6306H19.7096V5.48873L15.2746 0.224243ZM5.58852 12.5695C5.34016 12.8327 5.02084 12.9468 4.63056 12.9468C4.24028 12.9468 3.92096 12.8327 3.6726 12.5695C3.42424 12.3062 3.30006 11.9991 3.30006 11.6306C3.30006 11.2884 3.42424 10.9813 3.6726 10.7181C3.92096 10.4549 4.24028 10.3145 4.63056 10.3145C5.02084 10.3145 5.34016 10.4549 5.58852 10.7181C5.83688 10.9813 5.96106 11.2884 5.96106 11.6306C5.96106 11.9991 5.83688 12.3062 5.58852 12.5695ZM15.7536 12.5695C15.4875 12.8327 15.177 12.9468 14.8311 12.9468C14.4585 12.9468 14.1481 12.8327 13.882 12.5695C13.6159 12.3062 13.5006 11.9991 13.5006 11.6306C13.5006 11.2884 13.6159 10.9813 13.882 10.7181C14.1481 10.4549 14.4585 10.3145 14.8311 10.3145C15.177 10.3145 15.4875 10.4549 15.7536 10.7181C16.0197 10.9813 16.1616 11.2884 16.1616 11.6306C16.1616 11.9991 16.0197 12.3062 15.7536 12.5695ZM12.6136 5.48873V1.97907H14.4408L17.3945 5.48873H12.6136Z"
                            fill="white"
                          />
                        </svg>
                        <p>{operation.requiredVehicle}</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="staffVehicleDetail">
                  <div className="staffContainer">
                    {/* staff */}
                    <div className="staffDetailContainer">
                      <StaffPreview id={operation.id} />
                    </div>
                    {/* add btn */}
                    <div className="addStaffBtn">
                      <svg
                        onClick={() => handleStaffShow(site, operation)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        viewBox="0 0 50 50"
                        fill="none"
                      >
                        <rect width="50" height="50" rx="25" fill="#F27D14" />
                        <path
                          d="M16.3302 35.2121C16.3302 35.2121 14.7607 35.2121 14.7607 33.3288C14.7607 31.4454 16.3302 25.7953 24.1776 25.7953C32.025 25.7953 33.5944 31.4454 33.5944 33.3288C33.5944 35.2121 32.025 35.2121 32.025 35.2121H16.3302ZM24.1776 23.9119C25.4263 23.9119 26.624 23.3166 27.507 22.257C28.39 21.1974 28.886 19.7603 28.886 18.2618C28.886 16.7633 28.39 15.3262 27.507 14.2666C26.624 13.207 25.4263 12.6117 24.1776 12.6117C22.9288 12.6117 21.7312 13.207 20.8482 14.2666C19.9652 15.3262 19.4692 16.7633 19.4692 18.2618C19.4692 19.7603 19.9652 21.1974 20.8482 22.257C21.7312 23.3166 22.9288 23.9119 24.1776 23.9119Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M35.9487 18.2617C36.1568 18.2617 36.3564 18.3609 36.5036 18.5375C36.6508 18.7141 36.7335 18.9537 36.7335 19.2034V22.0285H39.0877C39.2958 22.0285 39.4954 22.1277 39.6426 22.3043C39.7897 22.4809 39.8724 22.7204 39.8724 22.9701C39.8724 23.2199 39.7897 23.4594 39.6426 23.636C39.4954 23.8126 39.2958 23.9118 39.0877 23.9118H36.7335V26.7369C36.7335 26.9866 36.6508 27.2262 36.5036 27.4028C36.3564 27.5794 36.1568 27.6786 35.9487 27.6786C35.7406 27.6786 35.541 27.5794 35.3938 27.4028C35.2467 27.2262 35.164 26.9866 35.164 26.7369V23.9118H32.8098C32.6016 23.9118 32.402 23.8126 32.2549 23.636C32.1077 23.4594 32.025 23.2199 32.025 22.9701C32.025 22.7204 32.1077 22.4809 32.2549 22.3043C32.402 22.1277 32.6016 22.0285 32.8098 22.0285H35.164V19.2034C35.164 18.9537 35.2467 18.7141 35.3938 18.5375C35.541 18.3609 35.7406 18.2617 35.9487 18.2617Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="vehicleContainer">
                    {/* vehicle */}
                    <div className="vehicleDetailContainer">
                      <VehiclePreview id={operation.id} />
                      {/* <div className="vehicleDetail">
                        <div className="vehicleImgContainer">
                          <div className="gpColor"></div>
                          <img src={Profile} alt="" className="vehicleImg" />
                        </div>
                        <p className="vehicleName">Vehicle 1</p>
                      </div> */}
                    </div>
                    <div className="addVehicleBtn">
                      <svg
                        onClick={() => handleVehicleShow(site, operation)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        viewBox="0 0 50 50"
                        fill="none"
                      >
                        <rect width="50" height="50" rx="25" fill="#F27D14" />
                        <path
                          d="M30.9999 18.9999H25.9999V27.9999H13.9999V31.9999H15.9999C15.9999 32.8299 16.2999 33.5299 16.8899 34.1299C17.4999 34.7199 18.1899 34.9999 18.9999 34.9999C19.8099 34.9999 20.4999 34.7199 21.1099 34.1299C21.6999 33.5299 21.9999 32.8299 21.9999 31.9999H27.4999C27.4999 32.8299 27.7799 33.5299 28.3799 34.1299C28.9699 34.7199 29.6699 34.9999 30.4999 34.9999C31.2999 34.9999 31.9999 34.7199 32.5899 34.1299C33.1899 33.5299 33.4999 32.8299 33.4999 31.9999H35.9999V24.9999L30.9999 18.9999ZM20.0799 33.0699C19.7999 33.3699 19.4399 33.4999 18.9999 33.4999C18.5599 33.4999 18.1999 33.3699 17.9199 33.0699C17.6399 32.7699 17.4999 32.4199 17.4999 31.9999C17.4999 31.6099 17.6399 31.2599 17.9199 30.9599C18.1999 30.6599 18.5599 30.4999 18.9999 30.4999C19.4399 30.4999 19.7999 30.6599 20.0799 30.9599C20.3599 31.2599 20.4999 31.6099 20.4999 31.9999C20.4999 32.4199 20.3599 32.7699 20.0799 33.0699ZM31.5399 33.0699C31.2399 33.3699 30.8899 33.4999 30.4999 33.4999C30.0799 33.4999 29.7299 33.3699 29.4299 33.0699C29.1299 32.7699 28.9999 32.4199 28.9999 31.9999C28.9999 31.6099 29.1299 31.2599 29.4299 30.9599C29.7299 30.6599 30.0799 30.4999 30.4999 30.4999C30.8899 30.4999 31.2399 30.6599 31.5399 30.9599C31.8399 31.2599 31.9999 31.6099 31.9999 31.9999C31.9999 32.4199 31.8399 32.7699 31.5399 33.0699ZM27.9999 24.9999V20.9999H30.0599L33.3899 24.9999H27.9999Z"
                          fill="white"
                        />
                        <path
                          d="M46 21.7143H40.8571V26H39.1429V21.7143H34V20.2857H39.1429V16H40.8571V20.2857H46V21.7143Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                </section>
              </div>
            ))
          ) : operationData?.length === 0 ? (
            <section className="operationDetail">
              <p>No operation </p>
            </section>
          ) : (
            <section className="operationDetail">
              <p>Loading...</p>
            </section>
          )}
        </>
      </div>
    );
  };

  const SiteList = ({ siteList }) => {
    return (
      <>
        {siteList.map((site) => (
          <SiteDetail key={site.id} site={site} />
        ))}
      </>
    );
  };
  const StaffPreview = ({ id }) => {
    const { data: selectedStaffs } = useFetchData(
      `http://localhost:8383/siteoperationstaffvehicle/getstaffbysiteoperationtypeid/${id}`,
      deleteStatus
    );
    const { data: Teams } = useFetchData(
      "http://localhost:8383/team/list",
      deleteStatus
    );
    return (
      <>
        {selectedStaffs.length > 0 ? (
          selectedStaffs.map((staff) => {
            const teamId = staff.Staff?.teamId;
            const team = Teams?.find((g) => g.id === teamId) || {};

            return (
              <div className="staffDetail" key={staff.Staff?.id}>
                <div className="staffImgContainer">
                  <div
                    className="teamColor"
                    style={{ backgroundColor: team.color || "gray" }}
                  ></div>
                  <img
                    src={staff.Staff?.image || "/default-avatar.png"}
                    alt={staff.Staff?.name}
                    className="staffImg"
                  />
                </div>
                <p className="staffName">{staff.Staff?.name}</p>
              </div>
            );
          })
        ) : (
          <p className="noStaffMessage">No staff assigned</p>
        )}
      </>
    );
  };
  const VehiclePreview = ({ id }) => {
    const { data: selectedVehicles } = useFetchData(
      `http://localhost:8383/siteoperationstaffvehicle/getvehiclebysiteoperationtypeid/${id}`,
      deleteStatus
    );

    const { data: Groups } = useFetchData(
      "http://localhost:8383/group/list",
      deleteStatus
    );
    return (
      <>
        {selectedVehicles.length > 0 ? (
          selectedVehicles.map((vehicle) => {
            const groupId = vehicle.Vehicle?.groupId;
            const group = Groups?.find((g) => g.id === groupId) || {};

            return (
              <div className="staffDetail" key={vehicle.Vehicle?.id}>
                <div className="staffImgContainer">
                  <div
                    className="teamColor"
                    style={{ backgroundColor: group.color || "gray" }}
                  ></div>
                  <img
                    src={vehicle.Vehicle?.image || "/default-avatar.png"}
                    alt={vehicle.Vehicle?.name}
                    className="staffImg"
                  />
                </div>
                <p className="staffName">{vehicle.Vehicle?.name}</p>
              </div>
            );
          })
        ) : (
          <p className="noStaffMessage">No Vehicle assigned</p>
        )}
      </>
    );
  };

  // for staff add
  const [showStaffAdd, setShowStaffAdd] = useState(false);

  const [site, setSite] = useState("Example");
  const [siteOperationId, setSiteOperationId] = useState(null);
  const handleStaffShow = (site, operation) => {
    setSiteOperationId(operation.id);
    setSite(site.name);
    setShowStaffAdd(true);
  };

  //for vehicle add
  const [showVehicleAdd, setShowVehicleAdd] = useState(false);
  const handleVehicleShow = (site, operation) => {
    setSiteOperationId(operation.id);
    setSite(site.name);
    setShowVehicleAdd(true);
  };

  // for add site
  const [showCreateModelBox, setShowCreateModelBox] = useState(false);
  // const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleCreateModelBox = () => {
    setShowCreateModelBox(true);
    console.log("Testing CreateModelBox");
    // setSelectedTaskId(null);
  };

  // for edit site
  const [showEditModelBox, setShowEditModelBox] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const handleEditModelBox = (id) => {
    console.log("Editing task:", id);
    setShowEditModelBox(true);
    setSelectedTaskId(id); // Store only the ID, not an object
  };
  const closeModal = () => {
    // setShowEditModelBox(false); // Hide modal
    setSelectedTaskId(null);
    if (refetchSiteList) {
      refetchSiteList();
    }
  };

  return (
    <div>
      <section className="dateFilterSection">
        <HomeDate />

        <button className="createNewBtn" onClick={handleCreateModelBox}>
          + New Site
        </button>
      </section>
      <section className="allDetailsSection">
        <div className="allDetails">
          <SiteList siteList={siteList} />
        </div>
      </section>
      {showStaffAdd && (
        <StaffAdd
          site={site}
          siteOperationId={siteOperationId}
          showStaffAdd={showStaffAdd}
          setShowStaffAdd={setShowStaffAdd}
        />
      )}
      {showVehicleAdd && (
        <VehicleAdd
          site={site}
          siteOperationId={siteOperationId}
          showVehicleAdd={showVehicleAdd}
          setShowVehicleAdd={setShowVehicleAdd}
        />
      )}

      {showCreateModelBox && (
        <Entry
          showCreateModelBox={showCreateModelBox}
          setShowCreateModelBox={setShowCreateModelBox}
          onSuccess={refetchSiteList}
        />
      )}

      {showEditModelBox && selectedTaskId && (
        <Edit
          showEditModelBox={showEditModelBox}
          setShowEditModelBox={setShowEditModelBox}
          id={selectedTaskId} // Use the selected task ID
          closeModal={closeModal} // Ensure modal can close
          onSuccess={refetchSiteList}
        />
      )}
    </div>
  );
}
