import s from './game-scores.module.css';

export type TScores = {
    scores: {
        [key: number]: number;
    };
};
export const GameScores = ({ scores }: TScores) => {
    return (
        <fieldset>
            <legend>Scores</legend>
            <ul className={s.list}>
                {Object.keys(scores).map((item) => (
                    <li className={s.listItem} key={item}>
                        Hero #{item} : {scores[Number(item)]}
                    </li>
                ))}
            </ul>
        </fieldset>
    );
};
