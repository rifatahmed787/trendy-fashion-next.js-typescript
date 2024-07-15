"use client";
import ServiceDetailsSkeleton from "@/components/Skeleton/ServiceDetailsSkeleton";
import HomeServiceDetails from "@/components/UI/Home-items/HomeServiceDetails";
import { useGetSingleServiceQuery } from "@/Redux/features/service/serviceApi";
import { IService } from "@/Types/service";
import React from "react";

const ServiceDetails = ({ params }: any) => {
  const serviceId = params?.serviceId;
  console.log("this is id", serviceId);

  const { data: service_details_data, isLoading } =
    useGetSingleServiceQuery(serviceId);

  const service_details: IService = service_details_data?.data;
  console.log(service_details);

  return (
    <section>
      {" "}
      <div className="px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <ServiceDetailsSkeleton />
        ) : (
          <div className="max-w-[1170px] mx-auto ">
            <div>
              <HomeServiceDetails service_details={service_details} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceDetails;
