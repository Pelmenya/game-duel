import s from './game-scores.module.css';

export type TScores = { [key: number]: number };

export type TScoresProps = {
    scores: TScores;
};

export const GameScores = ({ scores }: TScoresProps) => {
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
