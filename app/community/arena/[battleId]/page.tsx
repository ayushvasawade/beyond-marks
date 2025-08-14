
'use client';

import BattleRoom from "@/components/community/BattleRoom";
import { useParams } from 'next/navigation';

const BattlePage = () => {
    const { battleId } = useParams();

    return (
        <div>
            <BattleRoom battleId={battleId as string} />
        </div>
    );
};

export default BattlePage;
