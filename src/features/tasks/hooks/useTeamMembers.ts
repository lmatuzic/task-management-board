import { useCallback } from 'react';
import { fetchUsers } from '../actions/fetchUsers';
import { TeamMember } from '../types';

type UseTeamMembersProps = {
    handleSetIsFetchingTeamMembers: (isFetching: boolean) => void;
    handleSetTeamMembers: (teamMembers: TeamMember[]) => void;
};

export default function useTeamMembers({ handleSetIsFetchingTeamMembers, handleSetTeamMembers }: UseTeamMembersProps) {
    const fetchTeamMembers = useCallback(async () => {
        try {
            handleSetIsFetchingTeamMembers(true);
            const fetchedUsers: TeamMember[] = await fetchUsers();

            if (!fetchedUsers) {
                throw new Error();
            }

            handleSetTeamMembers(fetchedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            handleSetIsFetchingTeamMembers(false);
        }
    }, [handleSetIsFetchingTeamMembers, handleSetTeamMembers]);

    return { fetchTeamMembers };
}
