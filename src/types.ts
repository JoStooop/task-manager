import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from './store/reducers';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

// ThunkAction — это тип для thunk-действий.
// ReturnType — тип возвращаемого значения thunk-действия (по умолчанию void).
// RootState — тип корневого состояния Redux.
// unknown — тип для дополнительных аргументов (не используется).

// ThunkDispatch — тип для dispatch, который поддерживает thunk-действия.
// AnyAction — тип для любых действий (actions) в Redux.
