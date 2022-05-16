import styles from "./Matrix.module.css";

export default function Matrix(props) {
  function getScoreInputs(criteria, criteriaId) {
    const isOdd = criteriaId % 2 !== 0;
    return criteria.scores.map((score, index) => {
      return (
        <div
          className={`${styles.criteria} ${
            isOdd ? styles.oddRow : styles.evenRow
          }`}
        >
          <input
            type="number"
            defaultValue={score}
            onChange={(event) =>
              props.handleScore(index, score, criteriaId, event)
            }
            min={0}
            max={10}
          />
        </div>
      );
    });
  }
  function populateCriterias() {
    return props.criterias.map((criteria, criteriaId) => {
      // return (
      //   <ul>
      //     <li>
      //       {criteria.name} ({criteria.weight * 10})
      //     </li>
      //     {criteria.scores.map((score, index) => (
      //       <input
      //         type="number"
      //         defaultValue={score}
      //         onChange={(event) =>
      //           props.handleScore(index, score, criteriaId, event)
      //         }
      //         min={0}
      //         max={10}
      //       />
      //     ))}
      //   </ul>
      // );
      const scoreInputs = getScoreInputs(criteria, criteriaId);
      const isOdd = criteriaId % 2 !== 0;
      return [
        <div
          className={`${styles.criteria} ${
            isOdd ? styles.oddRow : styles.evenRow
          }`}
        >
          {criteria.name}
        </div>,
        <div
          className={`${styles.weight} ${
            isOdd ? styles.oddRow : styles.evenRow
          }`}
        >
          <input
            type="number"
            defaultValue={criteria.weight * 10}
            onChange={(event) => props.handleWeight(criteriaId, event)}
            min={0}
            max={10}
          />
        </div>,
        ...scoreInputs,
      ];
    });
  }
  function calculateTotal(index) {
    const sum = props.criterias.reduce(
      (partialSum, criteria) =>
        partialSum + criteria.scores[index] * criteria.weight * 10,
      0
    );
    return Math.floor(sum);
  }
  return (
    <div className={styles.matrix}>
      <div className={styles.header}>Criteria</div>
      <div className={styles.header}>Weight</div>
      <div className={styles.header}>
        <input type="text" defaultValue="Current"></input>
      </div>
      <div className={styles.header}>
        <input type="text" defaultValue="Alternative"></input>
      </div>
      {populateCriterias()}
      <div className={styles.total}>Total</div>
      <div className={styles.total}></div>
      <div className={styles.total}>{calculateTotal(0)}</div>
      <div className={styles.total}>{calculateTotal(1)}</div>
    </div>
  );
}
