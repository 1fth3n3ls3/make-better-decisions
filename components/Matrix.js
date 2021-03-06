import styles from "./Matrix.module.css";
import { v4 as uuidv4 } from "uuid";

export default function Matrix(props) {
  // console.log(props.alternatives);

  function handleAlternatives(event) {
    event.preventDefault();
    const val = event.target.value;
    const id = 0;
    // console.log(val);
    const newAlternatives = alternatives.map((alternative, index) => {
      return index === id ? val : alternative;
    });
    // console.log(alternatives);
    setAlternatives(newAlternatives);
  }

  function getScoreInputs(criteria, criteriaId) {
    const isOdd = criteriaId % 2 !== 0;
    return criteria.scores.map((score, index) => {
      return (
        <div
          className={`${styles.criteria} ${
            isOdd ? styles.oddRow : styles.evenRow
          }`}
          key={uuidv4()}
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
      const scoreInputs = getScoreInputs(criteria, criteriaId);
      const isOdd = criteriaId % 2 !== 0;
      return [
        <div
          className={`${styles.criteria} ${
            isOdd ? styles.oddRow : styles.evenRow
          }`}
          key={uuidv4()}
        >
          {criteria.name}
        </div>,
        <div
          className={`${styles.weight} ${
            isOdd ? styles.oddRow : styles.evenRow
          }`}
          key={uuidv4()}
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
    <div className={styles.matrix} key={uuidv4()}>
      <div className={styles.header} key={uuidv4()}>
        Criteria
      </div>
      <div className={styles.header} key={uuidv4()}>
        Weight
      </div>
      <div className={styles.header} key={"sssssss"}>
        <input
          type="text"
          defaultValue={props.alternatives[0]}
          onBlur={(event) => props.handleAlternatives(event, 0)}
        />
      </div>
      <div className={styles.header} key={"sddssdsdsdadsafaf"}>
        <input
          type="text"
          defaultValue={props.alternatives[1]}
          onBlur={(event) => props.handleAlternatives(event, 1)}
        />
      </div>
      {populateCriterias()}
      <div className={styles.total} key={uuidv4()}>
        Total
      </div>
      <div className={styles.total} key={uuidv4()}></div>
      <div className={styles.total} key={uuidv4()}>
        {calculateTotal(0)}
      </div>
      <div className={styles.total} key={uuidv4()}>
        {calculateTotal(1)}
      </div>
    </div>
  );
}
