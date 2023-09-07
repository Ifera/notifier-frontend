import { useQuery } from "@tanstack/react-query";
import APIClient, {FetchResponse} from "../services/api-client";
import {BaseQuery} from "../entities";
import {Application} from "../entities/Application";
import ms from "ms";

const apiClient = new APIClient<Application>('apps');

const useApplications = (params: BaseQuery) => {
    const pageNumber = params.pageNumber || 1;

    return useQuery<FetchResponse<Application>, Error>({
        queryKey: ['apps', pageNumber],
        queryFn: () =>
            apiClient.getAll({
                params: {
                    ...params,
                    pageNumber,
                    pageSize: params.pageSize || 3,
                },
            }),
        keepPreviousData: true,
        staleTime: ms('10s'),
    });
};

export default useApplications;
        